export const brand = {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  dark: {
    bg: '#0f1410',
    surface: '#161d17',
    card: '#1c251d',
    border: '#253027',
  },
  light: {
    bg: '#fafaf7',
    surface: '#ffffff',
    card: '#f4f6f2',
    border: '#e5e7e0',
  },
}

export type AppLocale = 'es' | 'en'
export const locales: AppLocale[] = ['es', 'en']
export const defaultLocale: AppLocale = 'es'
