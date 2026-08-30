'use client'

import { useState, useEffect } from 'react'
import { SavedPhrase, PhraseCategory } from '@/lib/types'
import styles from './PhrasesList.module.css'

const DEFAULT_PHRASES: SavedPhrase[] = [
  // Essentiels
  { kriolText: 'Bon dia!', frenchText: 'Bonjour ! (le matin)', category: 'Essentiels' },
  { kriolText: 'Modi ki bu sta?', frenchText: 'Comment vas-tu ?', category: 'Essentiels' },
  { kriolText: 'N sta dretu', frenchText: 'Je vais bien', category: 'Essentiels' },
  { kriolText: 'Nha nomi é…', frenchText: 'Je m\'appelle…', category: 'Essentiels' },
  { kriolText: 'Txau, te lógu!', frenchText: 'Au revoir, à plus tard !', category: 'Essentiels' },

  // Restaurant
  { kriolText: 'Éra sabi dimás!', frenchText: 'C\'était délicieux !', category: 'Restaurant' },
  { kriolText: 'Kantu é kel?', frenchText: 'Combien ça coûte ?', category: 'Restaurant' },
  { kriolText: 'N kre…', frenchText: 'Je veux…', category: 'Restaurant' },

  // Transports
  { kriolText: 'N bai pa Tarrafal', frenchText: 'Je vais à Tarrafal', category: 'Transports' },
  { kriolText: 'Ondi é paráderu?', frenchText: 'Où est l\'arrêt de bus ?', category: 'Transports' },

  // Marché
  { kriolText: 'Kantu ki é kilu?', frenchText: 'Combien le kilo ?', category: 'Marché' },
  { kriolText: 'É muito cáru', frenchText: 'C\'est trop cher', category: 'Marché' },
]

interface PhrasesListProps {
  newPhrase?: SavedPhrase | null
}

export default function PhrasesList({ newPhrase }: PhrasesListProps) {
  const [activeCategory, setActiveCategory] = useState<PhraseCategory['name']>('Essentiels')
  const [phrases, setPhrases] = useState<SavedPhrase[]>(DEFAULT_PHRASES)

  useEffect(() => {
    // Load from Supabase ou localStorage
    if (newPhrase) {
      setPhrases([newPhrase, ...phrases])
    }
  }, [newPhrase])

  const categories: PhraseCategory[] = [
    { name: 'Essentiels' },
    { name: 'Restaurant' },
    { name: 'Transports' },
    { name: 'Marché' },
    { name: 'Mes phrases' },
  ]

  const filteredPhrases = phrases.filter((p) => p.category === activeCategory)

  return (
    <div className={styles.section}>
      <span className={styles.label}>Ressources</span>
      <h2 className={styles.title}>Phrases utiles</h2>

      {/* Category Tabs */}
      <div className={styles.categoryTabs}>
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`${styles.categoryTab} ${activeCategory === cat.name ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Phrases Grid */}
      <div className={styles.phraseGrid}>
        {filteredPhrases.length > 0 ? (
          filteredPhrases.map((phrase, idx) => (
            <div key={idx} className={styles.phraseCard}>
              <div className={styles.phraseCategory}>{phrase.category}</div>
              <div className={styles.phraseKr}>{phrase.kriolText}</div>
              <div className={styles.phraseFr}>{phrase.frenchText}</div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '24px', color: 'var(--brume)' }}>
            Aucune phrase dans cette catégorie
          </div>
        )}
      </div>
    </div>
  )
}
