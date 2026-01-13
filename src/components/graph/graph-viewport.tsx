'use client'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import type { CameraState } from './hooks/use-camera'

interface GraphViewportProps {
  camera: CameraState
  children: React.ReactNode
}

export const GraphViewport = forwardRef<HTMLDivElement, GraphViewportProps>(
  function GraphViewport({ camera, children }, ref) {
    return (
      <motion.div
        ref={ref}
        className="absolute origin-top-left will-change-transform"
        style={{
          x: camera.x,
          y: camera.y,
          scale: camera.scale,
        }}
      >
        {children}
      </motion.div>
    )
  }
)
