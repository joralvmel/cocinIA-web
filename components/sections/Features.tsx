'use client'

import { SectionLabel } from '@/components/ui/SectionLabel'
import { motion } from 'framer-motion'
import { BookOpen, CalendarDays, ShoppingCart, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'

const iconMap = {
  Sparkles,
  CalendarDays,
  ShoppingCart,
  BookOpen,
}

export function Features() {
  const t = useTranslations()
  const items = t.raw('features.items') as Array<{ icon: keyof typeof iconMap; title: string; description: string }>

  return (
    <section id="features" className="bg-[--surface] py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <SectionLabel>{t('features.label')}</SectionLabel>
          <h2 className="mt-4 text-4xl font-black sm:text-5xl">{t('features.title')}</h2>
          <p className="mt-4 text-lg font-light text-[--muted]">{t('features.subtitle')}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1, ease: 'easeOut' } },
          }}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {items.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.article
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
                className="group rounded-2xl border border-[--border] bg-[--card] p-8 transition hover:-translate-y-1 hover:border-t-brand-primary-600 hover:border-t-[3px]"
              >
                <div className="mb-5 inline-flex rounded-xl bg-brand-primary-50 p-3 text-brand-primary-700 dark:bg-brand-primary-600/20 dark:text-brand-primary-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-base font-light text-[--muted]">{item.description}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
