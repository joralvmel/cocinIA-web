'use client'

import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type Status = 'loading' | 'success' | 'error'

interface HashPayload {
  access_token: string | null
  refresh_token: string | null
  type: string | null
  error_description: string | null
}

function parseAuthHash(): HashPayload {
  const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash
  const params = new URLSearchParams(hash)

  return {
    access_token: params.get('access_token'),
    refresh_token: params.get('refresh_token'),
    type: params.get('type'),
    error_description: params.get('error_description'),
  }
}

export default function AuthCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('loading')
  const [message, setMessage] = useState('Validando enlace...')

  const appDeepLink = useMemo(() => 'cocinia://auth/callback', [])

  useEffect(() => {
    const run = async () => {
      try {
        const payload = parseAuthHash()

        if (payload.error_description) {
          setStatus('error')
          setMessage(decodeURIComponent(payload.error_description))
          return
        }

        if (!payload.access_token || !payload.refresh_token) {
          setStatus('error')
          setMessage('Enlace invalido o expirado. Solicita uno nuevo desde la app.')
          return
        }

        const { error } = await supabase.auth.setSession({
          access_token: payload.access_token,
          refresh_token: payload.refresh_token,
        })

        if (error) {
          setStatus('error')
          setMessage(error.message)
          return
        }

        if (payload.type === 'recovery') {
          setStatus('success')
          setMessage('Enlace valido. Redirigiendo para cambiar tu contrasena...')
          router.replace(`/auth/reset-password${window.location.hash}`)
          return
        }

        setStatus('success')
        setMessage('Tu email ha sido confirmado correctamente. Ya puedes iniciar sesion en CocinIA.')
      } catch {
        setStatus('error')
        setMessage('No se pudo procesar el enlace. Intenta de nuevo.')
      }
    }

    void run()
  }, [router])

  return (
    <main className="min-h-screen bg-[--bg] py-16 text-[--ink]">
      <div className="section-shell mx-auto max-w-xl space-y-6 rounded-3xl border border-[--border] bg-[--card] p-8 text-center">
        <h1 className="text-3xl font-black">CocinIA</h1>
        <p className="text-sm text-[--muted]">{message}</p>

        {status === 'loading' ? <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[--border] border-t-brand-primary-600" /> : null}

        {status !== 'loading' ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={appDeepLink}
              className="rounded-full bg-brand-primary-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-brand-primary-700"
            >
              Abrir app
            </a>
            <Link href="/es" className="rounded-full border border-[--border] px-5 py-2 text-sm transition hover:bg-[--surface]">
              Ir al inicio
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  )
}
