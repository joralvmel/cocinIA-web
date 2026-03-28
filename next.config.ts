import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts')

const config: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default withNextIntl(config)
