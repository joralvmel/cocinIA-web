'use client'

import { AppLocale, locales } from '@/lib/brand'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

export function LanguageToggle() {
  const locale = useLocale() as AppLocale
  const pathname = usePathname()
  const router = useRouter()

  const onLocaleChange = (nextLocale: AppLocale) => {
    if (nextLocale === locale) {
      return
    }

    const segments = pathname.split('/')
    if (segments.length > 1) {
      segments[1] = nextLocale
      router.replace(segments.join('/') || `/${nextLocale}`)
      return
    }

    router.replace(`/${nextLocale}`)
  }

  return (
    <div className="inline-flex rounded-full border border-[--border] bg-[--surface] p-1">
      {locales.map((option) => {
        const active = option === locale
        return (
          <button
            key={option}
            type="button"
            onClick={() => onLocaleChange(option)}
            className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide transition ${
              active
                ? 'bg-brand-primary-600 text-white'
                : 'text-[--muted] hover:text-[--ink]'
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
