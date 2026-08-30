# Tradutor Kriolu

Traducteur bidirectionnel kriolu badiu ↔ français avec phrases utiles et grammaire.

## Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Anthropic Claude API (Sonnet 4)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Design**: Panu di Terra color palette, Fraunces + Public Sans

## Features

✨ **Traduction bidirectionnelle**
- Détection automatique kriolu/français
- Glossaire 3-6 mots clés
- Traduction instantanée via Claude

📚 **Phrases utiles**
- 4 catégories: Essentiels, Restaurant, Transports, Marché
- Possibilité d'ajouter ses propres phrases
- Sauvegarde en base de données Supabase

📖 **Grammaire**
- Tableau des verbes courants
- Conjugaisons: Présent, Futur, Passé
- 10 verbes clés

## Setup local

### 1. Clone et install

```bash
git clone <repo>
cd kriolu-app
npm install
```

### 2. Variables d'environnement

Créer `.env.local`:

```env
ANTHROPIC_API_KEY=your_key
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
```

### 3. Supabase Setup

Créer une table `saved_phrases`:

```sql
CREATE TABLE saved_phrases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kriol_text TEXT NOT NULL,
  french_text TEXT NOT NULL,
  category TEXT NOT NULL,
  user_id UUID REFERENCES auth.users,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Dev

```bash
npm run dev
```

Accès: http://localhost:3000

## Deployment

### Vercel

```bash
git push origin main
```

Variables d'environnement sur Vercel:
- `ANTHROPIC_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Structure

```
kriolu-app/
├── app/
│   ├── api/
│   │   ├── translate/route.ts      # Claude API
│   │   └── phrases/route.ts        # CRUD Supabase
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── page.module.css
├── components/
│   ├── Translator.tsx
│   ├── Translator.module.css
│   ├── PhrasesList.tsx
│   ├── PhrasesList.module.css
│   ├── VerbsTable.tsx
│   └── VerbsTable.module.css
├── lib/
│   ├── types.ts
│   └── supabase.ts
└── package.json
```

## Kriolu Badiu

Créole des îles du Cap-Vert (Santiago, île de Tarrafal).

**Conjugaison**: Verbes invariables + particules temporelles:
- Présent: `N papia` (je parle)
- Futur: `N ta papia` (je vais parler)
- Passé: `N dja papia` (j'ai parlé)
- Continu: `N sta papia` (je suis en train de parler)

**Pronoms**: N (je), bu (tu), el (il), nos (nous), bós (vous)

## Design

Palettes panu di terra (motifs traditionnels cap-verdiens):
- Indigo: `#0E1533`, `#141D45`, `#22306A`
- Or/Terre: `#C99A3C`, `#AE5127`
- Blanc: `#FBF7EC`, `#E9DFC6`

Typos:
- Headings: Fraunces (serif)
- Body: Public Sans (sans-serif)

## TODO

- [ ] Authentification utilisateur (Supabase Auth)
- [ ] Synchronisation multi-appareils
- [ ] Mode offline
- [ ] Historique traductions
- [ ] Partage phrases

## License

MIT
