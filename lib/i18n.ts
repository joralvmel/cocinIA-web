import { defaultLocale, locales } from '@/lib/brand'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  const nextLocale = locale && locales.includes(locale as (typeof locales)[number]) ? locale : defaultLocale

  return {
    locale: nextLocale,
    messages: (await import(`../messages/${nextLocale}.json`)).default,
  }
})
