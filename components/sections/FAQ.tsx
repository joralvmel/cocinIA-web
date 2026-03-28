'use client'

import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export function FAQ() {
  const t = useTranslations('faq')
  const items = t.raw('items') as Array<{ q: string; a: string }>
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-[--surface] py-24">
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
        </motion.div>

        <div className="mx-auto mt-12 max-w-[680px] divide-y divide-[--border] rounded-2xl border border-[--border] bg-[--card]">
          {items.map((item, index) => {
            const open = index === openIndex
            return (
              <div key={item.q} className="px-5 py-4 sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="font-medium">{item.q}</span>
                  <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
                    {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                      layout
                    >
                      <p className="pt-3 text-sm font-light text-[--muted]">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
