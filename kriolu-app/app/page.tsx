'use client'

import { useState } from 'react'
import Translator from '@/components/Translator'
import PhrasesList from '@/components/PhrasesList'
import VerbsTable from '@/components/VerbsTable'
import { SavedPhrase } from '@/lib/types'
import styles from './page.module.css'

export default function Home() {
  const [savedPhrase, setSavedPhrase] = useState<SavedPhrase | null>(null)

  const handleSavePhrase = async (phrase: { kr: string; fr: string; category: string }) => {
    try {
      const response = await fetch('/api/phrases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kriolText: phrase.kr,
          frenchText: phrase.fr,
          category: phrase.category,
        }),
      })

      if (!response.ok) throw new Error('Failed to save phrase')

      const saved = await response.json()
      setSavedPhrase({
        kriolText: phrase.kr,
        frenchText: phrase.fr,
        category: phrase.category as any,
      })
    } catch (error) {
      console.error('Save phrase error:', error)
      alert('Erreur lors de la sauvegarde')
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Hero */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Tradutor Kriolu</h1>
          <p className={styles.heroSubtitle}>
            Écris en kriolu ou en français — détection automatique et traduction instantanée.
          </p>
        </div>

        {/* Traducteur */}
        <div className={styles.section}>
          <Translator onSavePhrase={handleSavePhrase} />
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Phrases Utiles */}
        <div className={styles.section}>
          <PhrasesList newPhrase={savedPhrase} />
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Verbes */}
        <div className={styles.section}>
          <VerbsTable />
        </div>
      </div>
    </main>
  )
}
