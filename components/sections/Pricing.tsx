'use client'

import { SectionLabel } from '@/components/ui/SectionLabel'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function Pricing() {
  const t = useTranslations('pricing')
  const freeFeatures = t.raw('free.features') as string[]
  const premiumFeatures = t.raw('premium.features') as string[]

  return (
    <section id="pricing" className="bg-[--bg] py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          <SectionLabel>{t('label')}</SectionLabel>
          <h2 className="mt-4 text-4xl font-black sm:text-5xl">{t('title')}</h2>
          <p className="mt-4 text-lg font-light text-[--muted]">{t('subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="mt-12 grid gap-6 lg:grid-cols-2"
        >
          <article className="rounded-3xl border border-[--border] bg-[--card] p-8">
            <h3 className="text-xl font-semibold">{t('free.name')}</h3>
            <p className="mt-3 text-5xl font-black">{t('free.price')}</p>
            <p className="mt-1 text-sm text-[--muted]">{t('free.period')}</p>
            <p className="mt-4 text-sm text-[--muted]">{t('free.description')}</p>
            <a
              href="#waitlist"
              className="mt-6 inline-flex rounded-full border border-[--border] px-5 py-2 text-sm font-medium"
            >
              {t('free.cta')}
            </a>

            <ul className="mt-8 space-y-3">
              {freeFeatures.map((feature, index) => {
                const included = index < freeFeatures.length - 1
                return (
                  <li key={feature} className="flex items-center gap-3 text-sm text-[--ink]">
                    {included ? (
                      <Check className="h-4 w-4 text-brand-primary-600" />
                    ) : (
                      <X className="h-4 w-4 text-[--muted]" />
                    )}
                    <span className={included ? '' : 'text-[--muted]'}>{feature}</span>
                  </li>
                )
              })}
            </ul>
          </article>

          <article className="relative rounded-3xl bg-brand-primary-600 p-8 text-white ring-2 ring-brand-primary-600 ring-offset-2 ring-offset-[--bg]">
            <span className="absolute right-6 top-6 rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
              {t('premium.badge')}
            </span>
            <h3 className="text-xl font-semibold">{t('premium.name')}</h3>
            <p className="mt-3 text-5xl font-black">{t('premium.price')}</p>
            <p className="mt-1 text-sm text-white/80">{t('premium.period')}</p>
            <p className="mt-4 text-sm text-white/80">{t('premium.description')}</p>
            <a
              href="#waitlist"
              className="mt-6 inline-flex rounded-full bg-white px-5 py-2 text-sm font-medium text-brand-primary-700"
            >
              {t('premium.cta')}
            </a>

            <ul className="mt-8 space-y-3">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-white" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="mt-8 text-center"
        >
          <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-900 dark:bg-amber-900/30 dark:text-amber-200">
            {t('first_month')}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
