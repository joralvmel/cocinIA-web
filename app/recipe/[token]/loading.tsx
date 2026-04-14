export default function RecipeLoading() {
  return (
    <div className="min-h-screen bg-[--bg] text-[--ink]">
      {/* Navbar skeleton */}
      <header className="sticky top-0 z-50 border-b border-[--border] bg-[--bg]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="h-6 w-28 animate-pulse rounded bg-[--surface-container]" />
          <div className="flex gap-2">
            <div className="h-8 w-16 animate-pulse rounded-full bg-[--surface-container]" />
            <div className="h-8 w-8 animate-pulse rounded-full bg-[--surface-container]" />
          </div>
        </div>
      </header>

      {/* Hero skeleton */}
      <div className="h-64 w-full animate-pulse bg-[--surface-container] sm:h-80 lg:h-96" />

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:flex lg:gap-8">
        {/* Sidebar skeleton (desktop) */}
        <aside className="hidden lg:block lg:w-72 lg:shrink-0">
          <div className="space-y-6">
            <div className="h-64 animate-pulse rounded-2xl bg-[--surface-container]" />
            <div className="h-12 animate-pulse rounded-xl bg-[--surface-container]" />
            <div className="h-48 animate-pulse rounded-2xl bg-[--surface-container]" />
          </div>
        </aside>

        {/* Main column skeleton */}
        <div className="min-w-0 flex-1 space-y-6">
          {/* Title */}
          <div className="space-y-3">
            <div className="h-9 w-3/4 animate-pulse rounded bg-[--surface-container]" />
            <div className="h-5 w-full animate-pulse rounded bg-[--surface-container]" />
            <div className="h-5 w-2/3 animate-pulse rounded bg-[--surface-container]" />
          </div>

          {/* Chips */}
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-7 w-20 animate-pulse rounded-full bg-[--surface-container]" />
            ))}
          </div>

          {/* Mobile stats */}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-[--surface-container]" />
            ))}
          </div>

          {/* Nutrition card */}
          <div className="h-24 animate-pulse rounded-2xl bg-[--surface-container]" />

          {/* Ingredients card */}
          <div className="space-y-3 rounded-2xl border border-[--border-strong] bg-[--surface] p-5">
            <div className="h-7 w-32 animate-pulse rounded bg-[--surface-container]" />
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-5 animate-pulse rounded bg-[--surface-container]" />
            ))}
          </div>

          {/* Steps card */}
          <div className="space-y-4 rounded-2xl border border-[--border-strong] bg-[--surface] p-5">
            <div className="h-7 w-28 animate-pulse rounded bg-[--surface-container]" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-8 w-8 animate-pulse rounded-full bg-[--surface-container]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-[--surface-container]" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-[--surface-container]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
