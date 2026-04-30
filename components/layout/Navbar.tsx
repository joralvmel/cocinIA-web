'use client'

import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { androidAvailable, androidDownloadUrl } from '@/lib/brand'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Navbar() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const androidEnabled = androidAvailable && Boolean(androidDownloadUrl)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#features', label: t('features') },
    { href: '#screenshots', label: t('screenshots') },
    { href: '#pricing', label: t('pricing') },
    { href: '#faq', label: t('faq') },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-[--bg]/80 transition ${
        scrolled ? 'border-b border-[--border]' : ''
      }`}
    >
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        <Link href="#hero" className="flex items-center gap-3">
          <Image src="/logo-mark.png" alt="CocinIA logo" width={36} height={36} className="h-9 w-9" priority />
          <span className="font-serif text-2xl font-bold tracking-tight text-brand-primary-600">CocinIA</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-[--muted] transition hover:text-[--ink]">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageToggle />
          <ThemeToggle />
          {androidEnabled ? (
            <a
              href={androidDownloadUrl}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                scrolled
                  ? 'bg-brand-primary-600 text-white hover:bg-brand-primary-700'
                  : 'border border-[--border] bg-transparent text-[--ink] hover:border-brand-primary-500/40'
              }`}
            >
              {t('cta')}
            </a>
          ) : (
            <button
              type="button"
              disabled
              className={`cursor-not-allowed rounded-full px-4 py-2 text-sm font-medium ${
                scrolled
                  ? 'bg-brand-primary-600/40 text-white/80'
                  : 'border border-[--border] bg-transparent text-[--muted]'
              }`}
            >
              {t('cta')}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[--border] md:hidden"
          aria-label="toggle-menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="overflow-hidden border-t border-[--border] md:hidden"
      >
        <div className="section-shell flex flex-col gap-4 py-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-[--ink]"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            {androidEnabled ? (
              <a
                href={androidDownloadUrl}
                onClick={() => setOpen(false)}
                className="ml-auto rounded-full bg-brand-primary-600 px-4 py-2 text-sm font-medium text-white"
              >
                {t('cta')}
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="ml-auto cursor-not-allowed rounded-full bg-brand-primary-600/40 px-4 py-2 text-sm font-medium text-white/80"
              >
                {t('cta')}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </header>
  )
}
