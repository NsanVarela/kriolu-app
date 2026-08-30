'use client'

import styles from './VerbsTable.module.css'

interface Verb {
  verb: string
  meaning: string
  present: string
  future: string
  past: string
}

const VERBS: Verb[] = [
  {
    verb: 'papia',
    meaning: 'parler',
    present: 'N papia',
    future: 'N ta papia',
    past: 'N dja papia',
  },
  {
    verb: 'bai',
    meaning: 'aller',
    present: 'N bai',
    future: 'N ta bai',
    past: 'N dja bai',
  },
  {
    verb: 'kre',
    meaning: 'vouloir',
    present: 'N kre',
    future: 'N ta kre',
    past: 'N dja kre',
  },
  {
    verb: 'pode',
    meaning: 'pouvoir',
    present: 'N pode',
    future: 'N ta pode',
    past: 'N dja pode',
  },
  {
    verb: 'come',
    meaning: 'manger',
    present: 'N come',
    future: 'N ta come',
    past: 'N dja come',
  },
  {
    verb: 'bebe',
    meaning: 'boire',
    present: 'N bebe',
    future: 'N ta bebe',
    past: 'N dja bebe',
  },
  {
    verb: 'dumi',
    meaning: 'dormir',
    present: 'N dumi',
    future: 'N ta dumi',
    past: 'N dja dumi',
  },
  {
    verb: 'trabaja',
    meaning: 'travailler',
    present: 'N trabaja',
    future: 'N ta trabaja',
    past: 'N dja trabaja',
  },
  {
    verb: 'lee',
    meaning: 'lire',
    present: 'N lee',
    future: 'N ta lee',
    past: 'N dja lee',
  },
  {
    verb: 'scribe',
    meaning: 'écrire',
    present: 'N scribe',
    future: 'N ta scribe',
    past: 'N dja scribe',
  },
]

export default function VerbsTable() {
  return (
    <div className={styles.section}>
      <span className={styles.label}>Grammaire</span>
      <h2 className={styles.title}>Verbes courants</h2>

      <table className={styles.verbsTable}>
        <thead>
          <tr>
            <th>Verbe</th>
            <th>Sens</th>
            <th>Présent</th>
            <th>Futur</th>
            <th>Passé</th>
          </tr>
        </thead>
        <tbody>
          {VERBS.map((v, idx) => (
            <tr key={idx}>
              <td className={styles.verbName}>
                <strong>{v.verb}</strong>
              </td>
              <td>{v.meaning}</td>
              <td className={styles.conjugation}>{v.present}</td>
              <td className={styles.conjugation}>{v.future}</td>
              <td className={styles.conjugation}>{v.past}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.note}>
        <strong>Pattern :</strong> Verbes invariables + particules de temps devant{' '}
        <code>ta</code> (futur) et <code>dja</code> (passé)
      </div>
    </div>
  )
}
