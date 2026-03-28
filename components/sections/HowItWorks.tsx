'use client'

import { SectionLabel } from '@/components/ui/SectionLabel'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function HowItWorks() {
  const t = useTranslations()
  const steps = t.raw('how.steps') as Array<{ title: string; description: string }>

  return (
    <section className="bg-[--surface] py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          <SectionLabel>{t('how.label')}</SectionLabel>
          <h2 className="mt-4 text-4xl font-black sm:text-5xl">{t('how.title')}</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1, ease: 'easeOut' } },
          }}
          className="mt-12 grid gap-8 md:grid-cols-4"
        >
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
              className="relative"
            >
              {index < steps.length - 1 ? (
                <span className="absolute right-[-1rem] top-7 hidden h-px w-8 border-t border-dashed border-brand-primary-400 md:block" />
              ) : null}
              <div className="text-5xl font-black text-brand-primary-600">{String(index + 1).padStart(2, '0')}</div>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm font-light text-[--muted]">{step.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
