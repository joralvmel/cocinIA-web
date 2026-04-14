import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
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
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
