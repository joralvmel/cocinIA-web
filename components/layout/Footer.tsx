'use client'

import { Instagram, Mail, Twitter } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-[--border] bg-[--surface] py-16 dark:bg-[--surface]">
      <div className="section-shell space-y-10">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          <div className="space-y-3">
            <Image src="/logo.svg" alt="CocinIA" width={132} height={32} />
            <p className="text-sm text-[--muted]">{t('tagline')}</p>
          </div>

          <div className="flex items-center gap-5 text-sm text-[--muted] md:justify-center">
            <a href="#" className="transition hover:text-[--ink]">{t('links.privacy')}</a>
            <a href="#" className="transition hover:text-[--ink]">{t('links.terms')}</a>
            <a href="#" className="transition hover:text-[--ink]">{t('links.contact')}</a>
          </div>

          <div className="flex items-center justify-start gap-3 md:justify-end">
            <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[--border] text-[--muted] transition hover:text-[--ink]">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[--border] text-[--muted] transition hover:text-[--ink]">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[--border] text-[--muted] transition hover:text-[--ink]">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="border-t border-[--border] pt-6 text-center text-xs text-[--muted]">{t('copyright')}</div>
      </div>
    </footer>
  )
}
