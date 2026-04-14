'use client'

import { RecipeNavbar } from './RecipeNavbar'
import { Clock, Users, Flame, ChefHat, Copy, Check, Lightbulb, Refrigerator, Sparkles, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────
interface Ingredient {
  name: string
  quantity: number
  unit: string
  notes?: string | null
  is_optional?: boolean
}

interface RecipeStep {
  step_number: number
  instruction: string
  duration_minutes?: number | null
  tip?: string | null
}

interface Nutrition {
  calories: number
  protein_g: number
  carbs_g: number
  fat_g: number
  fiber_g?: number | null
}

export interface SharedRecipe {
  id: string
  title: string
  description: string
  ingredients: Ingredient[]
  steps: RecipeStep[]
  nutrition: Nutrition
  estimated_cost?: number | null
  cost_currency?: string | null
  cost_per_serving?: number | null
  prep_time_minutes: number
  cook_time_minutes: number
  total_time_minutes: number
  servings: number
  difficulty: string
  cuisine: string
  tags?: string[] | null
  chef_tips?: string[] | null
  storage_instructions?: string | null
  variations?: string[] | null
  meal_types?: string[] | null
  image_url?: string | null
  share_token: string
  created_at: string
}

type Messages = Record<string, Record<string, string> | string>

// ─── Component ────────────────────────────────────────────────────────
interface RecipePageContentProps {
  recipe: SharedRecipe
  messages: Messages
  initialLocale: string
}

export function RecipePageContent({ recipe, messages, initialLocale }: RecipePageContentProps) {
  const [locale, setLocale] = useState(initialLocale)
  const [copied, setCopied] = useState(false)

  // Load messages for current locale dynamically
  const [currentMessages, setCurrentMessages] = useState<Messages>(messages)

  const handleLocaleChange = useCallback(async (newLocale: string) => {
    try {
      const mod = await import(`@/messages/recipe.${newLocale}.json`)
      setCurrentMessages(mod.default)
      setLocale(newLocale)
    } catch {
      // fallback: keep current
    }
  }, [])

  const t = useCallback(
    (key: string): string => {
      const parts = key.split('.')
      let val: unknown = currentMessages
      for (const p of parts) {
        if (val && typeof val === 'object' && p in val) {
          val = (val as Record<string, unknown>)[p]
        } else {
          return key
        }
      }
      return typeof val === 'string' ? val : key
    },
    [currentMessages],
  )

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://cocinia.online/recipe/${recipe.share_token}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  const diffLabel = t(`stats.${recipe.difficulty}`)
  const deepLink = `cocinia://recipe/${recipe.share_token}`

  return (
    <div className="min-h-screen bg-[--bg] text-[--ink]">
      <RecipeNavbar locale={locale} onLocaleChange={handleLocaleChange} />

      {/* Hero */}
      {recipe.image_url ? (
        <div className="relative h-64 w-full sm:h-80 lg:h-96">
          <Image
            src={recipe.image_url}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[--bg] via-transparent to-transparent" />
        </div>
      ) : (
        <div className="h-4 sm:h-8" />
      )}

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:flex lg:gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block lg:w-72 lg:shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Stats card */}
            <div className="rounded-2xl border border-[--border-strong] bg-[--surface] p-5">
              <div className="space-y-4">
                <StatItem icon={<Clock className="h-4 w-4" />} label={t('stats.prepTime')} value={`${recipe.prep_time_minutes} min`} />
                <StatItem icon={<Clock className="h-4 w-4" />} label={t('stats.cookTime')} value={`${recipe.cook_time_minutes} min`} />
                <StatItem icon={<Clock className="h-4 w-4 text-[--green]" />} label={t('stats.totalTime')} value={`${recipe.total_time_minutes} min`} bold />
                <div className="h-px bg-[--border]" />
                <StatItem icon={<Users className="h-4 w-4" />} label={t('stats.servings')} value={String(recipe.servings)} />
                <StatItem icon={<Flame className="h-4 w-4" />} label="kcal" value={String(recipe.nutrition.calories)} />
                <StatItem icon={<ChefHat className="h-4 w-4" />} label={t('stats.difficulty')} value={diffLabel} />
              </div>
            </div>

            {/* Copy link */}
            <button
              onClick={handleCopy}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[--border-strong] bg-[--surface] px-4 py-3 text-sm font-medium transition hover:border-[--green]"
            >
              {copied ? <Check className="h-4 w-4 text-[--green]" /> : <Copy className="h-4 w-4" />}
              {copied ? t('cta.copied') : t('cta.copyLink')}
            </button>

            {/* App CTA */}
            <div className="rounded-2xl border border-[--border-strong] bg-[--surface] p-5 text-center">
              <Image src="/logo-mark.png" alt="CocinIA" width={40} height={40} className="mx-auto mb-3 h-10 w-10" />
              <p className="font-serif text-lg font-bold">CocinIA</p>
              <p className="mt-1 text-xs text-[--muted]">{t('cta.appTagline')}</p>
              <a
                href={deepLink}
                className="mt-4 block rounded-full bg-[--green] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                {t('cta.openInApp')}
              </a>
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="min-w-0 flex-1">
          {/* Title */}
          <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">{recipe.title}</h1>
          <p className="mb-6 text-[--muted] leading-relaxed">{recipe.description}</p>

          {/* Chips */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Chip>{diffLabel}</Chip>
            <Chip>{recipe.total_time_minutes} min</Chip>
            <Chip>{recipe.servings} {t('meta.servings')}</Chip>
            {recipe.cuisine && <Chip>{recipe.cuisine}</Chip>}
          </div>

          {/* Mobile stats */}
          <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:hidden">
            <MobileStat label={t('stats.prepTime')} value={`${recipe.prep_time_minutes}'`} />
            <MobileStat label={t('stats.cookTime')} value={`${recipe.cook_time_minutes}'`} />
            <MobileStat label={t('stats.totalTime')} value={`${recipe.total_time_minutes}'`} />
            <MobileStat label={t('stats.servings')} value={String(recipe.servings)} />
            <MobileStat label="kcal" value={String(recipe.nutrition.calories)} />
            <MobileStat label={t('stats.difficulty')} value={diffLabel} />
          </div>

          {/* Nutrition */}
          <SectionCard>
            <SectionTitle>{t('sections.nutrition')}</SectionTitle>
            <div className="grid grid-cols-4 gap-4">
              <NutritionItem value={recipe.nutrition.calories} unit="kcal" />
              <NutritionItem value={recipe.nutrition.protein_g} unit="g" label={locale === 'es' ? 'Proteínas' : 'Protein'} />
              <NutritionItem value={recipe.nutrition.carbs_g} unit="g" label={locale === 'es' ? 'Carbos' : 'Carbs'} />
              <NutritionItem value={recipe.nutrition.fat_g} unit="g" label={locale === 'es' ? 'Grasas' : 'Fat'} />
            </div>
          </SectionCard>

          {/* Cost */}
          {recipe.estimated_cost != null && recipe.cost_currency && (
            <SectionCard>
              <SectionTitle>{t('sections.cost')}</SectionTitle>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold">{recipe.estimated_cost} {recipe.cost_currency}</span>
                {recipe.cost_per_serving != null && (
                  <span className="text-sm text-[--muted]">({recipe.cost_per_serving} {t('sections.perServing')})</span>
                )}
              </div>
            </SectionCard>
          )}

          {/* Ingredients */}
          <SectionCard>
            <SectionTitle>{t('sections.ingredients')}</SectionTitle>
            <div className="divide-y divide-[--border]">
              {recipe.ingredients.map((ing, i) => (
                <div key={i} className="flex py-3">
                  <span className="w-28 shrink-0 text-right font-semibold text-[--green]">
                    {ing.quantity} {ing.unit}
                  </span>
                  <span className="ml-4 flex-1">
                    {ing.name}
                    {ing.is_optional && (
                      <span className="ml-1.5 text-xs text-[--muted]">({t('sections.optional')})</span>
                    )}
                    {ing.notes && (
                      <span className="ml-1.5 text-sm italic text-[--muted]">{ing.notes}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Steps */}
          <SectionCard>
            <SectionTitle>{t('sections.steps')}</SectionTitle>
            <div className="space-y-0 divide-y divide-[--border]">
              {recipe.steps.map((step) => (
                <StepItem key={step.step_number} step={step} tipLabel={locale === 'es' ? 'Tip' : 'Tip'} />
              ))}
            </div>
          </SectionCard>

          {/* Chef tips */}
          {recipe.chef_tips && recipe.chef_tips.length > 0 && (
            <SectionCard>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-[--amber]" />
                <SectionTitle noMargin>{t('sections.chefTips')}</SectionTitle>
              </div>
              <ul className="space-y-2">
                {recipe.chef_tips.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[--ink-secondary]">
                    <span className="text-[--amber]">💡</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}

          {/* Storage */}
          {recipe.storage_instructions && (
            <SectionCard>
              <div className="flex items-center gap-2 mb-4">
                <Refrigerator className="h-5 w-5 text-[--green]" />
                <SectionTitle noMargin>{t('sections.storage')}</SectionTitle>
              </div>
              <p className="text-sm text-[--ink-secondary] leading-relaxed">{recipe.storage_instructions}</p>
            </SectionCard>
          )}

          {/* Variations */}
          {recipe.variations && recipe.variations.length > 0 && (
            <SectionCard>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-[--green]" />
                <SectionTitle noMargin>{t('sections.variations')}</SectionTitle>
              </div>
              <ul className="space-y-2">
                {recipe.variations.map((v, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[--ink-secondary]">
                    <span className="text-[--green]">•</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              <Tag className="h-4 w-4 text-[--muted]" />
              {recipe.tags.map((tag, i) => (
                <span key={i} className="rounded-full bg-[--surface-container] px-3 py-1 text-xs text-[--muted]">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Mobile app CTA */}
          <div className="mt-8 rounded-2xl border border-[--green]/20 bg-[--green-container] p-6 text-center lg:hidden">
            <p className="text-sm text-[--muted] mb-3">{t('cta.generateRecipes')}</p>
            <a
              href={deepLink}
              className="inline-flex items-center gap-2 rounded-full bg-[--green] px-6 py-3 font-medium text-white shadow-md transition hover:opacity-90"
            >
              {t('cta.openInApp')}
            </a>
            <p className="mt-3 text-xs text-[--muted]">
              {t('cta.noApp')}{' '}
              <Link href="/es" className="text-[--green] underline">{t('cta.discoverApp')}</Link>
            </p>
          </div>

          {/* Mobile copy link */}
          <div className="mt-4 lg:hidden">
            <button
              onClick={handleCopy}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[--border-strong] bg-[--surface] px-4 py-3 text-sm font-medium transition hover:border-[--green]"
            >
              {copied ? <Check className="h-4 w-4 text-[--green]" /> : <Copy className="h-4 w-4" />}
              {copied ? t('cta.copied') : t('cta.copyLink')}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-[--border] py-8 text-center text-sm text-[--muted]">
        <p>© {new Date().getFullYear()} CocinIA — {t('cta.appTagline')}</p>
      </footer>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[--surface-container] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[--muted]">
      {children}
    </span>
  )
}

function StatItem({ icon, label, value, bold }: { icon: React.ReactNode; label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-[--muted]">
        {icon}
        <span>{label}</span>
      </div>
      <span className={`text-sm ${bold ? 'font-bold text-[--green]' : 'font-medium'}`}>{value}</span>
    </div>
  )
}

function MobileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[--surface-container] p-3 text-center">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[10px] font-medium uppercase tracking-wider text-[--muted]">{label}</p>
    </div>
  )
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-2xl border border-[--border-strong] bg-[--surface] p-5 sm:p-6">
      {children}
    </div>
  )
}

function SectionTitle({ children, noMargin }: { children: React.ReactNode; noMargin?: boolean }) {
  return (
    <h2 className={`font-serif text-xl font-bold ${noMargin ? '' : 'mb-4'}`}>{children}</h2>
  )
}

function NutritionItem({ value, unit, label }: { value: number; unit: string; label?: string }) {
  return (
    <div className="text-center">
      <p className="text-xl font-bold">{value}<span className="text-sm font-normal">{unit !== 'kcal' ? unit : ''}</span></p>
      <p className="text-xs font-medium uppercase tracking-wide text-[--green]">{label ?? unit}</p>
    </div>
  )
}

function StepItem({ step, tipLabel }: { step: RecipeStep; tipLabel: string }) {
  const [showTip, setShowTip] = useState(false)
  return (
    <div className="py-4">
      <div className="flex gap-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[--green] font-serif text-sm font-bold text-white">
          {step.step_number}
        </span>
        <div className="flex-1 pt-0.5">
          <p className="leading-relaxed">{step.instruction}</p>
          <div className="mt-2 flex items-center gap-3">
            {step.duration_minutes != null && step.duration_minutes > 0 && (
              <span className="text-xs text-[--muted]">⏱ {step.duration_minutes} min</span>
            )}
            {step.tip && (
              <button
                onClick={() => setShowTip(!showTip)}
                className="flex items-center gap-1 text-xs font-medium text-[--amber] hover:underline"
              >
                <Lightbulb className="h-3 w-3" />
                {tipLabel}
              </button>
            )}
          </div>
          {step.tip && showTip && (
            <div className="mt-2 rounded-lg bg-[--amber-container] p-3 text-sm text-[--amber]">
              💡 {step.tip}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
