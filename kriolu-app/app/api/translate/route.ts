import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { TranslationRequest, TranslationResponse, GlossaryEntry } from '@/lib/types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body: TranslationRequest = await request.json()
    const { text, sourceLanguage = 'auto' } = body

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Empty text' }, { status: 400 })
    }

    // Detect language if auto
    let detectedLang: 'kr' | 'fr' = sourceLanguage as 'kr' | 'fr'
    if (sourceLanguage === 'auto') {
      // Simple heuristic — improve with ML if needed
      const frenchKeywords = ['le', 'la', 'de', 'et', 'est', 'je', 'tu', 'il', 'elle']
      const frenchMatches = frenchKeywords.filter((kw) => text.toLowerCase().includes(kw)).length
      detectedLang = frenchMatches > 2 ? 'fr' : 'kr'
    }

    const targetLang = detectedLang === 'kr' ? 'fr' : 'kr'

    const prompt = `Tu es un traducteur kriolu badiu ↔ français expert.

Texte à traduire (${detectedLang === 'kr' ? 'kriolu' : 'français'}): "${text}"

Fournis UNIQUEMENT une réponse JSON (pas d'autres textes) dans ce format:
{
  "translatedText": "la traduction",
  "glossary": [
    { "word": "mot kriolu ou français", "meaning": "signification" }
  ]
}

Glossaire: 3-5 mots clés avec leurs traductions.
- Si kriolu → français : glossaire en kriolu
- Si français → kriolu : glossaire en français`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : ''

    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Invalid response format from Claude')
    }

    const parsed = JSON.parse(jsonMatch[0])

    const result: TranslationResponse = {
      translatedText: parsed.translatedText,
      glossary: parsed.glossary || [],
      sourceLanguage: detectedLang,
      targetLanguage: targetLang,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    )
  }
}
