import { NextRequest, NextResponse } from 'next/server'

interface WaitlistPayload {
  email: string
  locale?: string
}

// Run this in Supabase SQL Editor before deploying
// create table public.waitlist_emails (
//   id uuid primary key default gen_random_uuid(),
//   email text not null unique,
//   locale text not null default 'es',
//   created_at timestamptz not null default now()
// );
// alter table public.waitlist_emails enable row level security;
// create policy "Anyone can join waitlist"
//   on public.waitlist_emails for insert
//   with check (true);

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as WaitlistPayload
    const email = payload.email?.trim().toLowerCase()
    const locale = payload.locale === 'en' ? 'en' : 'es'

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Missing Supabase configuration' }, { status: 500 })
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/waitlist_emails`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({ email, locale }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      if (response.status === 409 || errorText.includes('duplicate key')) {
        return NextResponse.json({ success: true })
      }

      return NextResponse.json({ error: 'Unable to join waitlist' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}
