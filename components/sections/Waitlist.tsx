'use client'

import { Badge } from '@/components/ui/Badge'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'

type WaitlistErrorCode =
  | 'invalid_email'
  | 'email_exists'
  | 'rate_limited'
  | 'permission_error'
  | 'config_error'
  | 'server_error'
  | 'network_error'

interface WaitlistResponse {
  success?: boolean
  code?: WaitlistErrorCode
}

export function Waitlist() {
  const t = useTranslations('waitlist')
  const locale = useLocale()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail) {
      setError(t('errors.invalid_email'))
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: normalizedEmail, locale }),
      })

      const data = (await response.json()) as WaitlistResponse

      if (!response.ok || !data.success) {
        switch (data.code) {
          case 'invalid_email':
            setError(t('errors.invalid_email'))
            break
          case 'email_exists':
            setError(t('errors.email_exists'))
            break
          case 'rate_limited':
            setError(t('errors.rate_limited'))
            break
          case 'permission_error':
            setError(t('errors.permission'))
            break
          case 'network_error':
            setError(t('errors.network'))
            break
          case 'config_error':
          case 'server_error':
          default:
            setError(t('errors.server'))
            break
        }

        setLoading(false)
        return
      }

      setSuccess(true)
      setEmail('')
    } catch {
      setError(t('errors.network'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="waitlist" className="bg-[--bg] py-24 dark:bg-[--bg]">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-4xl font-black text-[--ink] sm:text-5xl">{t('title')}</h2>
          <p className="mt-4 text-lg font-light text-[--muted]">{t('subtitle')}</p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <Badge className="bg-[--card]">🤖 {t('badge_android')}</Badge>
            <Badge className="bg-[--card]">🍎 {t('badge_ios')}</Badge>
          </div>

          <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-[--border] bg-[--card] p-3 sm:rounded-full sm:p-2">
            {success ? (
              <p className="px-5 py-3 text-sm text-brand-primary-600">{t('success')}</p>
            ) : (
              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-2 sm:flex sm:items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t('placeholder')}
                  aria-invalid={Boolean(error)}
                  className="h-12 w-full min-w-0 rounded-xl border border-transparent bg-[--surface] px-5 text-sm outline-none transition focus:border-brand-primary-600 sm:flex-1 sm:rounded-full"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-brand-primary-600 px-6 text-sm font-medium text-white transition hover:bg-brand-primary-700 disabled:opacity-60 sm:w-auto sm:rounded-full"
                >
                  {loading ? '...' : t('cta')}
                </button>
              </form>
            )}
          </div>

          {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
          <p className="mt-4 text-xs text-[--muted]">{t('note')}</p>
        </motion.div>
      </div>
    </section>
  )
}
