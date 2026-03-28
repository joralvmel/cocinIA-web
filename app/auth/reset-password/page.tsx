'use client'

import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

type Status = 'loading' | 'ready' | 'success' | 'error'

function parseHashTokens() {
  const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash
  const params = new URLSearchParams(hash)

  return {
    accessToken: params.get('access_token'),
    refreshToken: params.get('refresh_token'),
  }
}

function parseSearchError() {
  const params = new URLSearchParams(window.location.search)
  const error = params.get('error')
  const errorDescription = params.get('error_description')

  return {
    error,
    errorDescription,
  }
}

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<Status>('loading')
  const [message, setMessage] = useState('Validando enlace...')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const { error, errorDescription } = parseSearchError()
        if (error) {
          setStatus('error')
          if (error === 'access_denied') {
            setMessage('Este enlace ya fue usado o ha expirado. Solicita uno nuevo desde la app.')
          } else {
            setMessage(errorDescription || 'No se pudo validar el enlace de recuperacion.')
          }
          return
        }

        const { accessToken, refreshToken } = parseHashTokens()

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })

          if (error) {
            setStatus('error')
            setMessage('El enlace no es valido o ya expiro. Solicita otro desde la app.')
            return
          }

          window.history.replaceState({}, document.title, '/auth/reset-password')
        }

        const { data } = await supabase.auth.getSession()
        if (!data.session) {
          setStatus('error')
          setMessage('Este enlace ya fue usado o ha expirado. Solicita uno nuevo desde la app.')
          return
        }

        setStatus('ready')
        setMessage('Introduce tu nueva contrasena.')
      } catch {
        setStatus('error')
        setMessage('No se pudo validar el enlace de recuperacion.')
      }
    }

    void bootstrap()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password.length < 8) {
      setStatus('error')
      setMessage('La contrasena debe tener al menos 8 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setStatus('error')
      setMessage('Las contrasenas no coinciden.')
      return
    }

    setSaving(true)
    setStatus('ready')

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setStatus('error')
      setMessage(error.message)
      setSaving(false)
      return
    }

    setStatus('success')
    setMessage('Contrasena actualizada. Ya puedes iniciar sesion en la app con tu nueva contrasena.')
    setSaving(false)
  }

  return (
    <main className="min-h-screen bg-[--bg] py-16 text-[--ink]">
      <div className="section-shell mx-auto max-w-xl space-y-6 rounded-3xl border border-[--border] bg-[--card] p-8">
        <h1 className="text-center text-3xl font-black">Restablecer contrasena</h1>
        <p className="text-center text-sm text-[--muted]">{message}</p>

        {status === 'loading' ? <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[--border] border-t-brand-primary-600" /> : null}

        {status === 'ready' ? (
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Nueva contrasena"
              className="h-12 w-full rounded-full border border-[--border] bg-[--surface] px-5 text-sm outline-none transition focus:border-brand-primary-600"
            />
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirmar contrasena"
              className="h-12 w-full rounded-full border border-[--border] bg-[--surface] px-5 text-sm outline-none transition focus:border-brand-primary-600"
            />
            <button
              type="submit"
              disabled={saving}
              className="h-12 w-full rounded-full bg-brand-primary-600 px-6 text-sm font-medium text-white transition hover:bg-brand-primary-700 disabled:opacity-60"
            >
              {saving ? 'Guardando...' : 'Actualizar contrasena'}
            </button>
          </form>
        ) : null}

        {status !== 'loading' ? (
          <div className="text-center">
            <Link href="/es" className="text-sm text-brand-primary-600 hover:underline">
              Volver al inicio
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  )
}
