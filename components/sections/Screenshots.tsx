'use client'

import { PhoneMockup } from '@/components/ui/PhoneMockup'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'

interface TabItem {
  key: string
  label: string
}

export function Screenshots() {
  const t = useTranslations()
  const { resolvedTheme } = useTheme()
  const tabs = useMemo(() => t.raw('screenshots.tabs') as TabItem[], [t])
  const [active, setActive] = useState(tabs[0]?.key ?? 'home')
  const [mounted, setMounted] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState<Record<string, number>>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  const activeTab = tabs.find((tab) => tab.key === active) ?? tabs[0]
  const themeKey: 'light' | 'dark' = mounted && resolvedTheme === 'dark' ? 'dark' : 'light'
  const screenshotKey = activeTab.key === 'shopping' ? 'shopping-list' : activeTab.key
  const assetId = `${screenshotKey}-${themeKey}`
  const candidates = [
    `/screenshots/${screenshotKey}-${themeKey}.jpg`,
    `/screenshots/${screenshotKey}-${themeKey}.png`,
    `/screenshots/${activeTab.key}-${themeKey}.jpg`,
    `/screenshots/${activeTab.key}-${themeKey}.png`,
    `/screenshots/${activeTab.key}.png`,
  ].filter((value, index, array) => array.indexOf(value) === index)
  const attemptIndex = failedAttempts[assetId] ?? 0
  const currentSrc = candidates[attemptIndex]
  const isMissing = !currentSrc

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
          className="mt-10 grid w-full grid-cols-4 gap-1 rounded-xl bg-[--card] p-1"
        >
          {tabs.map((tab) => {
            const activeClass = tab.key === active
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                className={`min-w-0 rounded-lg px-1 py-2 text-[11px] font-medium leading-tight transition sm:text-sm ${
                  activeClass
                    ? 'bg-brand-primary-600/10 text-brand-primary-600'
                    : 'text-[--muted] hover:text-[--ink]'
                }`}
              >
                <span className="block truncate">{tab.label}</span>
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
                {isMissing ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 bg-[--card] p-4 text-center text-sm text-[--muted]">
                    <Image src="/logo-mark.png" alt="CocinIA icon" width={56} height={56} className="h-14 w-14" />
                    <span>{activeTab.label}</span>
                  </div>
                ) : (
                  <Image
                    src={currentSrc}
                    alt={activeTab.label}
                    fill
                    className="object-contain"
                    onError={() =>
                      setFailedAttempts((prev) => ({
                        ...prev,
                        [assetId]: (prev[assetId] ?? 0) + 1,
                      }))
                    }
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
