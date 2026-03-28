'use client'

import { Badge } from '@/components/ui/Badge'
import { PhoneMockup } from '@/components/ui/PhoneMockup'
import { heroDemoVideoSrc } from '@/lib/brand'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const parent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      ease: 'easeOut',
    },
  },
}

const child = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Hero() {
  const t = useTranslations()
  const featureItems = t.raw('features.items') as Array<{ title: string; description: string }>
  const chips = [featureItems[0]?.title, featureItems[1]?.title, featureItems[2]?.title].filter(Boolean)

  const highlightText = t('hero.title_highlight')
  const title = t('hero.title')
  const [before, after] = title.split(highlightText)

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-brand-primary-50/55 via-transparent to-transparent pt-32 dark:from-brand-primary-900/30"
    >
      <div className="hero-grain" />
      <div className="section-shell relative grid min-h-[100svh] items-center gap-16 pb-16 lg:grid-cols-2">
        <motion.div variants={parent} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={child}>
            <Badge className="border-brand-primary-200 bg-brand-primary-50 text-brand-primary-700 dark:border-brand-primary-600/30 dark:bg-brand-primary-600/10 dark:text-brand-primary-400">
              <span className="mr-2 h-2 w-2 rounded-full bg-brand-primary-600" />
              {t('hero.badge')}
            </Badge>
          </motion.div>

          <motion.h1 variants={child} className="max-w-[14ch] text-5xl font-black leading-[0.95] sm:text-6xl lg:text-[5rem]">
            {before}
            <span className="text-brand-primary-600">{highlightText}</span>
            {after}
          </motion.h1>

          <motion.p variants={child} className="max-w-xl text-lg font-light text-[--muted]">
            {t('hero.subtitle')}
          </motion.p>

          <motion.div variants={child} className="flex flex-wrap gap-3">
            <a
              href="#pricing"
              className="rounded-full bg-brand-primary-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-primary-700"
            >
              {t('hero.cta_primary')}
            </a>
            <a
              href="#features"
              className="rounded-full border border-[--border] bg-[--surface] px-6 py-3 text-sm font-medium text-[--ink] transition hover:border-brand-primary-500/50"
            >
              {t('hero.cta_secondary')}
            </a>
          </motion.div>

          <motion.div variants={child} className="inline-flex items-center gap-2 text-sm text-[--muted]">
            <Lock className="h-4 w-4 text-brand-primary-600" />
            <span>24,381 {t('hero.social_proof')}</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <PhoneMockup>
            {heroDemoVideoSrc ? (
              <div className="h-full w-full bg-black">
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  poster="/logo-app-tile.png"
                >
                  <source src={heroDemoVideoSrc} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div className="h-full w-full bg-gradient-to-b from-brand-primary-100/70 via-[--surface] to-[--card] p-5 dark:from-brand-primary-900/35">
                <div className="flex h-full flex-col rounded-3xl border border-[--border] bg-[--surface] p-4">
                  <div className="flex items-center gap-2 rounded-2xl bg-[--card] px-3 py-2">
                    <Image src="/logo-mark.png" alt="CocinIA icon" width={22} height={22} className="h-5 w-5" />
                    <span className="text-sm font-medium text-[--ink]">CocinIA</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-[--border] bg-[--card] p-3 text-xs text-[--muted]">{featureItems[0]?.description}</div>
                    <div className="rounded-2xl border border-[--border] bg-[--card] p-3 text-xs text-[--muted]">{featureItems[1]?.description}</div>
                    <div className="rounded-2xl border border-[--border] bg-[--card] p-3 text-xs text-[--muted]">{featureItems[2]?.description}</div>
                  </div>
                </div>
              </div>
            )}
          </PhoneMockup>

          {chips.map((chip, index) => (
            <motion.div
              key={chip}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 + index * 0.12 }}
              className={`absolute rounded-full border border-[--border] bg-[--surface] px-3 py-1 text-xs font-medium shadow-sm ${
                index === 0
                  ? '-left-8 top-20'
                  : index === 1
                    ? '-right-6 top-44'
                    : '-left-6 bottom-20'
              }`}
            >
              {index === 0 ? '✨ ' : index === 1 ? '📅 ' : '🛒 '} {chip}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
