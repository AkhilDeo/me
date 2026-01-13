'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Map, ScrollText } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ModeToggle() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isStoryMode = searchParams.get('mode') === 'story'

  const toggleMode = () => {
    if (isStoryMode) {
      // Switch to graph mode
      router.push('/', { scroll: false })
    } else {
      // Switch to story mode
      router.push('/?mode=story', { scroll: false })
    }
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
      aria-label={`Switch to ${isStoryMode ? 'graph' : 'story'} mode`}
    >
      {isStoryMode ? (
        <>
          <Map className="w-4 h-4" />
          <span className="hidden sm:inline">Graph</span>
        </>
      ) : (
        <>
          <ScrollText className="w-4 h-4" />
          <span className="hidden sm:inline">Story</span>
        </>
      )}
    </button>
  )
}
