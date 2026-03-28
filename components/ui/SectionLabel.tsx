import { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-brand-primary-200/80 bg-brand-primary-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-brand-primary-700 dark:border-brand-primary-600/30 dark:bg-brand-primary-600/10 dark:text-brand-primary-400">
      {children}
    </span>
  )
}
