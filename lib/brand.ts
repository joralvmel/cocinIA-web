export const brand = {
  primary: {
    50: '#f0fdf4',
    100: '#d4f5e0',
    200: '#a8ebc0',
    400: '#2d9e55',
    500: '#1a7a3c',
    600: '#1a7a3c',
    700: '#15632f',
    800: '#166534',
    900: '#14532d',
  },
  dark: {
    bg: '#0f1412',
    surface: '#141a17',
    card: '#1a2320',
    border: 'rgba(223, 228, 224, 0.08)',
  },
  light: {
    bg: '#f5f7f5',
    surface: '#ffffff',
    card: '#eef2ef',
    border: 'rgba(17, 24, 20, 0.06)',
  },
}

export type AppLocale = 'es' | 'en'
export const locales: AppLocale[] = ['es', 'en']
export const defaultLocale: AppLocale = 'es'

export const heroDemoVideos: Record<'light' | 'dark', Record<AppLocale, string>> = {
  light: {
    en: '/demo/light-en.mp4',
    es: '/demo/light-es.mp4',
  },
  dark: {
    en: '/demo/dark-en.mp4',
    es: '/demo/dark-es.mp4',
  },
}
