'use client'

import { forwardRef } from 'react'
import type { CameraState } from './hooks/use-camera'

interface GraphViewportProps {
  camera: CameraState
  children: React.ReactNode
}

export const GraphViewport = forwardRef<HTMLDivElement, GraphViewportProps>(
  function GraphViewport({ camera, children }, ref) {
    return (
      <div
        ref={ref}
        className="absolute origin-top-left will-change-transform"
        style={{
          transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})`,
        }}
      >
        {children}
      </div>
    )
  }
)
