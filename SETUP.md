# Setup Vercel & Supabase

## 1️⃣ Supabase

### Créer table `saved_phrases`

```sql
CREATE TABLE public.saved_phrases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kriol_text TEXT NOT NULL,
  french_text TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Essentiels', 'Restaurant', 'Transports', 'Marché', 'Mes phrases')),
  user_id UUID REFERENCES auth.users,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

ALTER TABLE public.saved_phrases ENABLE ROW LEVEL SECURITY;
```

### Récupérer credentials

- Dashboard → Settings → API
- Copier: `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- Copier: `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copier: `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

## 2️⃣ Anthropic API Key

1. Dashboard Anthropic → API keys
2. Créer nouvelle clé
3. Copier → `ANTHROPIC_API_KEY`

## 3️⃣ GitHub

```bash
git init
git add .
git commit -m "init: kriolu-app Next.js with Supabase"
git remote add origin https://github.com/your-username/kriolu-app.git
git push -u origin main
```

## 4️⃣ Vercel

1. https://vercel.com/new
2. Importer repo GitHub
3. Environment variables:
   - `ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy ✨

## 5️⃣ Test local

```bash
npm install
npm run dev
# http://localhost:3000
```

Écrire en kriolu ou français → vérifier traduction Claude → tester "Ajouter aux phrases"

## 🔗 URLs importantes

- Supabase Dashboard: https://app.supabase.com
- Anthropic API: https://console.anthropic.com
- Vercel: https://vercel.com/dashboard
