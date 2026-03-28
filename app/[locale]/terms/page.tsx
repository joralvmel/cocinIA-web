import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal.terms' })

  return (
    <main className="min-h-screen bg-[--bg] py-16 text-[--ink]">
      <div className="section-shell mx-auto max-w-3xl space-y-8">
        <Link href={`/${locale}`} className="text-sm text-[--muted] transition hover:text-[--ink]">
          {t('back')}
        </Link>

        <header className="space-y-3">
          <h1 className="text-4xl font-black sm:text-5xl">{t('title')}</h1>
          <p className="text-sm text-[--muted]">{t('updated')}</p>
        </header>

        <section className="space-y-3 rounded-3xl border border-[--border] bg-[--card] p-6">
          <h2 className="text-xl font-semibold">{t('sections.acceptance.title')}</h2>
          <p className="text-sm text-[--muted]">{t('sections.acceptance.body')}</p>
        </section>

        <section className="space-y-3 rounded-3xl border border-[--border] bg-[--card] p-6">
          <h2 className="text-xl font-semibold">{t('sections.usage.title')}</h2>
          <p className="text-sm text-[--muted]">{t('sections.usage.body')}</p>
        </section>

        <section className="space-y-3 rounded-3xl border border-[--border] bg-[--card] p-6">
          <h2 className="text-xl font-semibold">{t('sections.liability.title')}</h2>
          <p className="text-sm text-[--muted]">{t('sections.liability.body')}</p>
        </section>
      </div>
    </main>
  )
}
