import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

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
}

interface Nutrition {
  calories: number
  protein_g: number
  carbs_g: number
  fat_g: number
}

interface SharedRecipe {
  id: string
  title: string
  description: string
  ingredients: Ingredient[]
  steps: RecipeStep[]
  nutrition: Nutrition
  total_time_minutes: number
  servings: number
  difficulty: string
  cuisine: string
  share_token: string
}

async function getRecipe(token: string): Promise<SharedRecipe | null> {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabase
    .from('recipes')
    .select('id, title, description, ingredients, steps, nutrition, total_time_minutes, servings, difficulty, cuisine, share_token')
    .eq('share_token', token)
    .eq('is_public', true)
    .single()

  if (error || !data) return null
  return data as SharedRecipe
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>
}): Promise<Metadata> {
  const { token } = await params
  const recipe = await getRecipe(token)
  if (!recipe) return { title: 'Receta no encontrada — CocinIA' }

  const description = `${recipe.description} · ${recipe.total_time_minutes} min · ${recipe.nutrition.calories} kcal · ${recipe.servings} porciones`

  return {
    title: `${recipe.title} — CocinIA`,
    description,
    openGraph: {
      title: recipe.title,
      description,
      url: `https://cocinia.online/recipe/${token}`,
      siteName: 'CocinIA',
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: recipe.title,
      description,
    },
  }
}

function getDifficultyLabel(d: string) {
  return d === 'easy' ? 'Fácil' : d === 'medium' ? 'Intermedio' : d === 'hard' ? 'Difícil' : d
}

export default async function SharedRecipePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const recipe = await getRecipe(token)
  if (!recipe) notFound()

  const deepLink = `cocinia://recipe/${token}`

  return (
    <div className="min-h-screen bg-[--bg] text-[--ink]">
      {/* Header */}
      <header className="border-b border-[--border] bg-[--bg]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <Link href="/es" className="flex items-center gap-2">
            <Image src="/logo-mark.png" alt="CocinIA" width={32} height={32} className="h-8 w-8" />
            <span className="font-serif text-xl font-bold text-brand-primary-600">CocinIA</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {/* Open in app banner */}
        <div className="mb-8 flex flex-col items-center gap-3 rounded-2xl border border-brand-primary-200 bg-brand-primary-50 p-6 text-center dark:border-brand-primary-800/30 dark:bg-brand-primary-900/20">
          <p className="text-sm text-[--muted]">¿Tienes la app instalada?</p>
          <a
            href={deepLink}
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary-600 px-6 py-3 font-medium text-white shadow-md transition hover:bg-brand-primary-700"
          >
            Abrir en CocinIA
          </a>
          <p className="text-xs text-[--muted]">
            ¿No la tienes?{' '}
            <Link href="/es" className="text-brand-primary-600 underline">
              Descubre CocinIA
            </Link>
          </p>
        </div>

        {/* Recipe title */}
        <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight">{recipe.title}</h1>
        <p className="mb-6 text-[--muted]">{recipe.description}</p>

        {/* Chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-[--surface] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[--muted]">
            {getDifficultyLabel(recipe.difficulty)}
          </span>
          <span className="rounded-full bg-[--surface] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[--muted]">
            {recipe.total_time_minutes} min
          </span>
          <span className="rounded-full bg-[--surface] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[--muted]">
            {recipe.servings} porciones
          </span>
          {recipe.cuisine && (
            <span className="rounded-full bg-[--surface] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[--muted]">
              {recipe.cuisine}
            </span>
          )}
        </div>

        {/* Nutrition */}
        <div className="mb-8 grid grid-cols-4 gap-4 rounded-xl border border-[--border] p-4">
          <div className="text-center">
            <p className="text-lg font-bold">{recipe.nutrition.calories}</p>
            <p className="text-xs font-medium uppercase text-brand-primary-600">kcal</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{recipe.nutrition.protein_g}g</p>
            <p className="text-xs font-medium uppercase text-brand-primary-600">Proteínas</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{recipe.nutrition.carbs_g}g</p>
            <p className="text-xs font-medium uppercase text-brand-primary-600">Carbos</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{recipe.nutrition.fat_g}g</p>
            <p className="text-xs font-medium uppercase text-brand-primary-600">Grasas</p>
          </div>
        </div>

        {/* Ingredients */}
        <section className="mb-8">
          <h2 className="mb-4 font-serif text-xl font-bold">Ingredientes</h2>
          <div className="divide-y divide-[--border] rounded-xl border border-[--border]">
            {recipe.ingredients.map((ing, i) => (
              <div key={i} className="flex px-4 py-3">
                <span className="w-28 shrink-0 text-right font-medium text-brand-primary-600">
                  {ing.quantity} {ing.unit}
                </span>
                <span className="ml-4">
                  {ing.name}
                  {ing.is_optional && <span className="ml-1 text-xs text-[--muted]">(opcional)</span>}
                  {ing.notes && <span className="ml-1 text-sm italic text-[--muted]">{ing.notes}</span>}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="mb-8">
          <h2 className="mb-4 font-serif text-xl font-bold">Preparación</h2>
          <div className="divide-y divide-[--border] rounded-xl border border-[--border]">
            {recipe.steps.map((step, i) => (
              <div key={i} className="flex gap-4 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary-600 text-xs font-bold text-white">
                  {step.step_number}
                </span>
                <div className="flex-1">
                  <p>{step.instruction}</p>
                  {step.duration_minutes != null && step.duration_minutes > 0 && (
                    <p className="mt-1 text-xs text-[--muted]">⏱ {step.duration_minutes} min</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="text-center">
          <p className="mb-3 text-sm text-[--muted]">
            Genera recetas personalizadas con IA
          </p>
          <a
            href={deepLink}
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary-600 px-6 py-3 font-medium text-white shadow-md transition hover:bg-brand-primary-700"
          >
            Abrir en CocinIA
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[--border] py-6 text-center text-sm text-[--muted]">
        <p>© {new Date().getFullYear()} CocinIA — Tu chef personal con IA</p>
      </footer>
    </div>
  )
}
