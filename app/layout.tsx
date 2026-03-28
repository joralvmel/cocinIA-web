import type { Metadata } from 'next'
import '@/app/globals.css'
import { Providers } from '@/components/ui/Providers'

export const metadata: Metadata = {
  title: 'CocinIA - Tu chef personal con IA',
  description:
    'Genera recetas personalizadas, planifica tu semana y crea tu lista de la compra automaticamente con inteligencia artificial.',
  metadataBase: new URL('https://cocinia.online'),
  openGraph: {
    title: 'CocinIA - Tu chef personal con IA',
    description: 'Genera recetas, planifica tu semana y crea tu lista de la compra con IA.',
    url: 'https://cocinia.online',
    siteName: 'CocinIA',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CocinIA - Tu chef personal con IA',
    description: 'Tu chef personal impulsado por IA.',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <body className="font-sans bg-[--bg] text-[--ink] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
