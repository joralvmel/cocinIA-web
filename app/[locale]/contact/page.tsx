import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal.contact' })

  return (
    <main className="min-h-screen bg-[--bg] py-16 text-[--ink]">
      <div className="section-shell mx-auto max-w-3xl space-y-8">
        <Link href={`/${locale}`} className="text-sm text-[--muted] transition hover:text-[--ink]">
          {t('back')}
        </Link>

        <header className="space-y-3">
          <h1 className="text-4xl font-black sm:text-5xl">{t('title')}</h1>
          <p className="text-sm text-[--muted]">{t('subtitle')}</p>
        </header>

        <section className="space-y-2 rounded-3xl border border-[--border] bg-[--card] p-6">
          <h2 className="text-xl font-semibold">{t('email.title')}</h2>
          <a href="mailto:hola@cocinia.online" className="text-sm text-brand-primary-600 hover:underline">
            hola@cocinia.online
          </a>
          <p className="text-sm text-[--muted]">{t('email.body')}</p>
        </section>

        <section className="space-y-2 rounded-3xl border border-[--border] bg-[--card] p-6">
          <h2 className="text-xl font-semibold">{t('social.title')}</h2>
          <a
            href="https://www.instagram.com/cocinia.26/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-brand-primary-600 hover:underline"
          >
            @cocinia.26
          </a>
          <p className="text-sm text-[--muted]">{t('social.body')}</p>
        </section>
      </div>
    </main>
  )
}
