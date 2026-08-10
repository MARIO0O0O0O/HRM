import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Uses the anon key intentionally -- RLS policy "anyone can join waitlist"
// permits public INSERT only. No elevated privileges needed here.
function anonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || ''
  let email = ''
  let spoke = ''

  if (contentType.includes('application/json')) {
    const body = await req.json()
    email = body.email
    spoke = body.spoke
  } else {
    const form = await req.formData()
    email = String(form.get('email') || '')
    spoke = String(form.get('spoke') || '')
  }

  if (!email || !spoke) {
    return NextResponse.redirect(new URL('/tools?waitlist=error', req.url))
  }

  const supabase = anonClient()
  const { error } = await supabase.from('waitlist').insert({ email, spoke })

  if (error) {
    return NextResponse.redirect(new URL('/tools?waitlist=error', req.url))
  }

  // The GatedSpokePlaceholder form is a plain HTML form post (no JS fetch),
  // so redirect back with a success flag the page can read.
  return NextResponse.redirect(new URL(`/tools?waitlist=success&spoke=${spoke}`, req.url))
}
