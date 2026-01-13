'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className={cn(
          'p-2 rounded-lg',
          'bg-[var(--muted)] border border-[var(--border)]',
          'text-[var(--muted-foreground)]',
        )}
        aria-label="Toggle theme"
      >
        <Sun className="w-4 h-4" />
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'p-2 rounded-lg',
        'bg-[var(--muted)] border border-[var(--border)]',
        'text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
        'hover:bg-[var(--accent)]',
        'transition-colors duration-150',
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
