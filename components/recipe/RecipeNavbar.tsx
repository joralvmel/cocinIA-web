'use client'

import { ThemeToggle } from '@/components/ui/ThemeToggle'
import Image from 'next/image'
import Link from 'next/link'

interface RecipeNavbarProps {
  locale: string
  onLocaleChange: (locale: string) => void
}

export function RecipeNavbar({ locale, onLocaleChange }: RecipeNavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[--border] bg-[--bg]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/es" className="flex items-center gap-2">
          <Image src="/logo-mark.png" alt="CocinIA" width={32} height={32} className="h-8 w-8" />
          <span className="font-serif text-xl font-bold text-[--green]">CocinIA</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-full border border-[--border] bg-[--surface] p-1">
            {(['es', 'en'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onLocaleChange(opt)}
                className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide transition ${
                  opt === locale
                    ? 'bg-[--green] text-white'
                    : 'text-[--muted] hover:text-[--ink]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
