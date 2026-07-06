import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Server-side client dengan service_role key — bypass RLS sepenuhnya
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customer_name, email, whatsapp, service_type, requirements } = body

    // Validasi minimal
    if (!customer_name || !whatsapp) {
      return NextResponse.json(
        { error: 'Nama dan WhatsApp wajib diisi' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert([{ customer_name, email, whatsapp, service_type, requirements }])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: error.message, code: error.code, hint: error.hint },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 200 })

  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
