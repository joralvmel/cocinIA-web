# CocinIA Web Landing

Marketing landing page for CocinIA, built with Next.js 15 (App Router), TypeScript, and Tailwind CSS.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v3
- Framer Motion
- next-intl (ES/EN)
- next-themes (light/dark)
- Lucide React

## Requirements

- Node.js 20+
- npm 10+

## Installation

```bash
npm install
```

## Local Development

```bash
npm run dev
```

Open http://localhost:3000.

## Production Build

```bash
npm run build
```

## Scripts

- `npm run dev`: start development server
- `npm run build`: create production build
- `npm run start`: run production server
- `npm run lint`: run Next.js linting

## Environment Variables

Use the template in [cocinia-web/.env.local.example](.env.local.example):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Main Structure

- [cocinia-web/app](app): App Router routes and API endpoint
- [cocinia-web/components](components): layout, sections, and reusable UI
- [cocinia-web/lib](lib): brand tokens and i18n configuration
- [cocinia-web/messages](messages): ES/EN translations
- [cocinia-web/public](public): static assets

## Deployment Notes

The project uses `output: 'export'` in [cocinia-web/next.config.ts](next.config.ts), which generates static output.

Important: [cocinia-web/app/api/waitlist/route.ts](app/api/waitlist/route.ts) requires server runtime. If deploying as fully static, submit the waitlist form directly to Supabase from the client instead.

## Current Status

- Full landing page implemented section by section
- ES/EN internationalization with locale routes (`/es`, `/en`)
- Light/dark theme support
- Production build validated
