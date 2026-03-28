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
    bg: '#111827',
    surface: '#1f2937',
    card: '#1f2937',
    border: '#374151',
  },
  light: {
    bg: '#ffffff',
    surface: '#f9fafb',
    card: '#ffffff',
    border: '#e5e7eb',
  },
}

export type AppLocale = 'es' | 'en'
export const locales: AppLocale[] = ['es', 'en']
export const defaultLocale: AppLocale = 'es'

// Set this to something like '/demo/recipe-generation.mp4' when the recording is ready.
export const heroDemoVideoSrc = ''
