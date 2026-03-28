'use client'

import { PhoneMockup } from '@/components/ui/PhoneMockup'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'

interface TabItem {
  key: string
  label: string
}

export function Screenshots() {
  const t = useTranslations()
  const tabs = useMemo(() => t.raw('screenshots.tabs') as TabItem[], [t])
  const [active, setActive] = useState(tabs[0]?.key ?? 'home')
  const [missing, setMissing] = useState<Record<string, boolean>>({})

  const activeTab = tabs.find((tab) => tab.key === active) ?? tabs[0]

  return (
    <section id="screenshots" className="bg-[--bg] py-24 dark:bg-[--surface]">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          <SectionLabel>{t('screenshots.label')}</SectionLabel>
          <h2 className="mt-4 text-4xl font-black sm:text-5xl">{t('screenshots.title')}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {tabs.map((tab) => {
            const activeClass = tab.key === active
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                className={`border-b-2 px-2 py-2 text-sm transition ${
                  activeClass
                    ? 'border-brand-primary-600 text-brand-primary-600'
                    : 'border-transparent text-[--muted] hover:text-[--ink]'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="mt-10"
        >
          <PhoneMockup className="mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab?.key}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative h-full w-full"
              >
                {missing[activeTab.key] ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 bg-[--card] p-4 text-center text-sm text-[--muted]">
                    <Image src="/logo-mark.png" alt="CocinIA icon" width={56} height={56} className="h-14 w-14" />
                    <span>{activeTab.label}</span>
                  </div>
                ) : (
                  <Image
                    src={`/screenshots/${activeTab.key}.png`}
                    alt={activeTab.label}
                    fill
                    className="object-contain"
                    onError={() => setMissing((prev) => ({ ...prev, [activeTab.key]: true }))}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </PhoneMockup>
        </motion.div>
      </div>
    </section>
  )
}
