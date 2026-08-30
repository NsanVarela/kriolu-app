import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text } = body

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Empty text' }, { status: 400 })
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `Traduis ceci de kriolu badiu en français: "${text}"\n\nRéponds UNIQUEMENT avec la traduction française, rien d'autre.`,
        },
      ],
    })

    const translatedText = message.content[0].type === 'text' ? message.content[0].text : ''

    return NextResponse.json({
      translatedText,
      glossary: [],
      sourceLanguage: 'kr',
      targetLanguage: 'fr',
    })
  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    )
  }
}