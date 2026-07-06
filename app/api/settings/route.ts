import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
)

// GET all settings
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('settings')
    .select('key, value')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Ubah array [{key, value}] menjadi object {key: value}
  const settings = Object.fromEntries(data.map((s: { key: string; value: string }) => [s.key, s.value]))
  return NextResponse.json({ data: settings })
}

// POST: upsert settings
export async function POST(request: Request) {
  const body = await request.json() // { key: value, key2: value2, ... }

  const upsertRows = Object.entries(body).map(([key, value]) => ({ key, value }))

  const { error } = await supabaseAdmin
    .from('settings')
    .upsert(upsertRows, { onConflict: 'key' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
