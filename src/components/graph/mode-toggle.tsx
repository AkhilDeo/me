'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Map, ScrollText } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ModeToggle() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isGraphMode = searchParams.get('mode') === 'graph'

  const toggleMode = () => {
    if (isGraphMode) {
      // Switch to normal view
      router.push('/', { scroll: false })
      return
    }
    // Switch to graph view
    router.push('/?mode=graph', { scroll: false })
  }

  return (
    <button
      onClick={toggleMode}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg',
        'bg-[var(--muted)] border border-[var(--border)]',
        'text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
        'hover:bg-[var(--accent)]',
        'transition-colors duration-150',
        'text-sm font-medium',
      )}
      aria-label={`Switch to ${isGraphMode ? 'normal view' : 'graph'} mode`}
    >
      {isGraphMode ? (
        <>
          <ScrollText className="w-4 h-4" />
          <span className="hidden sm:inline">Normal View</span>
        </>
      ) : (
        <>
          <Map className="w-4 h-4" />
          <span className="hidden sm:inline">Graph</span>
        </>
      )}
    </button>
  )
}
