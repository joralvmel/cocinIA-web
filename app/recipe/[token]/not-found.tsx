import Image from 'next/image'
import Link from 'next/link'

export default function RecipeNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[--bg] px-4 text-center text-[--ink]">
      <Image src="/logo-mark.png" alt="CocinIA" width={64} height={64} className="mb-6 h-16 w-16" />
      <h1 className="mb-2 font-serif text-2xl font-bold">Esta receta no está disponible</h1>
      <p className="mb-8 max-w-sm text-[--muted]">
        El enlace puede haber expirado o la receta fue eliminada.
      </p>
      <Link
        href="https://cocinia.online"
        className="rounded-full bg-[--green] px-6 py-3 font-medium text-white transition hover:opacity-90"
      >
        Ir a cocinia.online
      </Link>
    </div>
  )
}
