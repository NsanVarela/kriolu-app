'use client'

import { useState } from 'react'
import { TranslationResponse, GlossaryEntry } from '@/lib/types'
import styles from './Translator.module.css'

interface TranslatorProps {
  onSavePhrase: (phrase: { kr: string; fr: string; category: string }) => void
}

export default function Translator({ onSavePhrase }: TranslatorProps) {
  const [input, setInput] = useState('')
  const [translation, setTranslation] = useState<TranslationResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const detectLanguage = (text: string): 'kr' | 'fr' => {
    const kriolWords = /\b(papia|bai|ben|kre|pode|ta|come|bebe|dumi|trabaja|fá|buska|odja|scribe|lee|aprende|grita|toca|canta|é|ki|n|bu|el|nos|bós|dja|sta|ka)\b/i
    const frenchWords = /\b(je|tu|il|elle|nous|vous|ils|elles|le|la|les|un|une|de|des|et|ou|mais)\b/i

    const kriolMatches = (text.match(kriolWords) || []).length
    const frenchMatches = (text.match(frenchWords) || []).length

    return kriolMatches > frenchMatches ? 'kr' : 'fr'
  }

  const handleTranslate = async () => {
    if (!input.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: input,
          sourceLanguage: detectLanguage(input),
        }),
      })

      if (!response.ok) throw new Error('Translation failed')

      const data: TranslationResponse = await response.json()
      setTranslation(data)
      setIsSaved(false)
    } catch (error) {
      console.error('Translation error:', error)
      alert('Erreur lors de la traduction')
    } finally {
      setLoading(false)
    }
  }

  const handleSavePhrase = (category: string) => {
    if (translation) {
      onSavePhrase({
        kr: translation.sourceLanguage === 'kr' ? input : translation.translatedText,
        fr: translation.sourceLanguage === 'fr' ? input : translation.translatedText,
        category,
      })
      setIsSaved(true)
      setShowCategoryModal(false)
    }
  }

  return (
    <div className={styles.section}>
      <span className={styles.label}>Traduction</span>
      <h2 className={styles.title}>Traducteur bidirectionnel</h2>

      <div className={styles.translateSection}>
        {/* Input */}
        <div className={styles.inputWrapper}>
          <div className={styles.inputLabel}>
            <span>Écris ici</span>
            {input && (
              <span className={styles.detectBadge}>
                {detectLanguage(input) === 'kr' ? '🇨🇻 Kriolu' : '🇫🇷 Français'}
              </span>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && handleTranslate()}
            placeholder="Écris en kriolu ou en français..."
          />
          <button
            onClick={handleTranslate}
            disabled={loading || !input.trim()}
            style={{
              marginTop: '12px',
              backgroundColor: 'var(--terre)',
              color: 'var(--coton)',
              padding: '10px 20px',
              opacity: loading || !input.trim() ? 0.5 : 1,
            }}
          >
            {loading ? '⏳ Traduction...' : '✨ Traduire'}
          </button>
        </div>

        {/* Result */}
        {translation && (
          <div>
            <span className={styles.resultLabel}>Traduction</span>
            <div className={styles.resultBox} onMouseEnter={() => {}} onMouseLeave={() => {}}>
              <div>
                <div className={styles.resultText}>{translation.translatedText}</div>
                {translation.glossary.length > 0 && (
                  <div className={styles.glossary}>
                    {translation.glossary.map((entry, idx) => (
                      <div key={idx}>
                        <strong>{entry.word}</strong> — {entry.meaning}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                className={`${styles.saveIcon} ${isSaved ? styles.saved : ''}`}
                onClick={() => setShowCategoryModal(true)}
                title="Ajouter aux phrases utiles"
              >
                {isSaved ? '✓' : '🔖'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showCategoryModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCategoryModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: "'Fraunces', serif", marginBottom: '16px', color: 'var(--or)' }}>
              Catégorie
            </h2>
            <div className={styles.modalOptions}>
              {['Essentiels', 'Restaurant', 'Transports', 'Marché', 'Mes phrases'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleSavePhrase(cat)}
                  className={styles.modalOption}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
