'use client'

import { GRID } from '@/lib/constants'

interface GraphGridProps {
  scale: number
}

export function GraphGrid({ scale }: GraphGridProps) {
  const gridSize = GRID.SIZE * scale
  const majorSize = gridSize * GRID.MAJOR_EVERY

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          radial-gradient(circle, var(--graph-grid) 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        backgroundPosition: 'center center',
      }}
    >
      {/* Major grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--graph-grid-major) 1px, transparent 1px),
            linear-gradient(to bottom, var(--graph-grid-major) 1px, transparent 1px)
          `,
          backgroundSize: `${majorSize}px ${majorSize}px`,
          backgroundPosition: 'center center',
          opacity: 0.4,
        }}
      />
    </div>
  )
}
