import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { SavedPhrase } from '@/lib/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// GET — récupérer les phrases de l'utilisateur
export async function GET(request: NextRequest) {
  try {
    // TODO: Ajouter authentification utilisateur
    // Pour l'instant, récupère toutes les phrases publiques

    const { data, error } = await supabase
      .from('saved_phrases')
      .select('*')
      .limit(100)

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Fetch phrases error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch phrases' },
      { status: 500 }
    )
  }
}

// POST — ajouter une phrase
export async function POST(request: NextRequest) {
  try {
    const body: SavedPhrase = await request.json()

    if (!body.kriolText || !body.frenchText || !body.category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('saved_phrases')
      .insert([
        {
          kriol_text: body.kriolText,
          french_text: body.frenchText,
          category: body.category,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(data?.[0] || {}, { status: 201 })
  } catch (error) {
    console.error('Create phrase error:', error)
    return NextResponse.json(
      { error: 'Failed to create phrase' },
      { status: 500 }
    )
  }
}

// DELETE — supprimer une phrase
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing phrase id' }, { status: 400 })
    }

    const { error } = await supabase
      .from('saved_phrases')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete phrase error:', error)
    return NextResponse.json(
      { error: 'Failed to delete phrase' },
      { status: 500 }
    )
  }
}
