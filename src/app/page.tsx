'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { GraphCanvas } from '@/components/graph/graph-canvas'
import { StoryMode } from '@/components/graph/story-mode'

function HomeContent() {
  const searchParams = useSearchParams()
  const isGraphMode = searchParams.get('mode') === 'graph'

  if (isGraphMode) {
    return <GraphCanvas />
  }

  return <StoryMode />
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingState />}>
      <HomeContent />
    </Suspense>
  )
}

function LoadingState() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
