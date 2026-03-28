import { NextRequest, NextResponse } from 'next/server'

interface WaitlistPayload {
  email: string
  locale?: string
}

type WaitlistErrorCode =
  | 'invalid_email'
  | 'email_exists'
  | 'rate_limited'
  | 'permission_error'
  | 'config_error'
  | 'server_error'
  | 'network_error'

const EMAIL_REGEX = /^(?=.{5,254}$)[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i

function isDuplicateEmailError(status: number, rawError: string): boolean {
  if (status === 409) {
    return true
  }

  const normalized = rawError.toLowerCase()
  return normalized.includes('duplicate key') || normalized.includes('23505') || normalized.includes('waitlist_emails_email_key')
}

function isPermissionError(status: number, rawError: string): boolean {
  const normalized = rawError.toLowerCase()
  return status === 401 || status === 403 || normalized.includes('42501') || normalized.includes('row-level security policy')
}

function jsonError(code: WaitlistErrorCode, status: number) {
  return NextResponse.json({ success: false, code }, { status })
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

    if (!email || !EMAIL_REGEX.test(email)) {
      return jsonError('invalid_email', 400)
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return jsonError('config_error', 500)
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/waitlist_emails`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        // Minimal response avoids requiring SELECT permission under RLS.
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ email, locale }),
    })

    if (!response.ok) {
      const errorText = await response.text()

      if (response.status === 429) {
        return jsonError('rate_limited', 429)
      }

      if (isPermissionError(response.status, errorText)) {
        return jsonError('permission_error', 500)
      }

      if (isDuplicateEmailError(response.status, errorText)) {
        return jsonError('email_exists', 409)
      }

      return jsonError('server_error', 500)
    }

    return NextResponse.json({ success: true })
  } catch {
    return jsonError('network_error', 500)
  }
}
