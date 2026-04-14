import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { RecipePageContent, type SharedRecipe } from '@/components/recipe/RecipePageContent'
import messagesEs from '@/messages/recipe.es.json'
import messagesEn from '@/messages/recipe.en.json'

const messagesMap: Record<string, typeof messagesEs> = { es: messagesEs, en: messagesEn }

const RECIPE_FIELDS = 'id, title, description, ingredients, steps, nutrition, estimated_cost, cost_currency, cost_per_serving, prep_time_minutes, cook_time_minutes, total_time_minutes, servings, difficulty, cuisine, tags, chef_tips, storage_instructions, variations, meal_types, image_url, share_token, created_at'

async function getRecipeByToken(token: string): Promise<SharedRecipe | null> {
  const { data, error } = await supabase
    .from('recipes')
    .select(RECIPE_FIELDS)
    .eq('share_token', token)
    .eq('is_public', true)
    .single()

  if (error || !data) return null
  return data as SharedRecipe
}

function detectLocale(acceptLanguage: string | null): 'es' | 'en' {
  if (!acceptLanguage) return 'es'
  const primary = acceptLanguage.split(',')[0]?.toLowerCase() ?? ''
  return primary.startsWith('es') ? 'es' : 'en'
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>
}): Promise<Metadata> {
  const { token } = await params
  const recipe = await getRecipeByToken(token)
  if (!recipe) return { title: 'Receta no encontrada — CocinIA' }

  const description = `${recipe.description} · ${recipe.total_time_minutes} min · ${recipe.nutrition.calories} kcal · ${recipe.servings} porciones`

  return {
    title: `${recipe.title} — CocinIA`,
    description,
    alternates: { canonical: `https://cocinia.online/recipe/${token}` },
    openGraph: {
      title: recipe.title,
      description,
      url: `https://cocinia.online/recipe/${token}`,
      siteName: 'CocinIA',
      type: 'article',
      ...(recipe.image_url ? { images: [{ url: recipe.image_url }] } : {}),
    },
    twitter: {
      card: recipe.image_url ? 'summary_large_image' : 'summary',
      title: recipe.title,
      description,
      ...(recipe.image_url ? { images: [recipe.image_url] } : {}),
    },
  }
}

export default async function SharedRecipePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const recipe = await getRecipeByToken(token)
  if (!recipe) notFound()

  const headersList = await headers()
  const locale = detectLocale(headersList.get('accept-language'))
  const messages = messagesMap[locale] ?? messagesEs

  return <RecipePageContent recipe={recipe} messages={messages} initialLocale={locale} />
}
