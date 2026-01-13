'use client'

import { useState, useCallback, useRef } from 'react'
import { useAnimate } from 'framer-motion'
import { CAMERA, NODE } from '@/lib/constants'
import { getNode, type GraphNode } from '@/lib/graph-data'
import { usePrefersReducedMotion } from '@/hooks/use-media-query'

export interface CameraState {
  x: number
  y: number
  scale: number
}

export interface CameraActions {
  pan: (dx: number, dy: number) => void
  zoom: (delta: number, centerX: number, centerY: number) => void
  setCamera: (state: Partial<CameraState>) => void
  animateTo: (x: number, y: number, scale?: number) => Promise<void>
  centerOnNode: (nodeId: string, viewportWidth: number, viewportHeight: number) => Promise<void>
  reset: (viewportWidth: number, viewportHeight: number) => Promise<void>
}

const initialState: CameraState = {
  x: 0,
  y: 0,
  scale: CAMERA.DEFAULT_SCALE,
}

export function useCamera(): [CameraState, CameraActions, React.RefObject<HTMLDivElement | null>] {
  const [camera, setCamera] = useState<CameraState>(initialState)
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const prefersReducedMotion = usePrefersReducedMotion()

  const clampScale = (scale: number) =>
    Math.max(CAMERA.MIN_SCALE, Math.min(CAMERA.MAX_SCALE, scale))

  const pan = useCallback((dx: number, dy: number) => {
    setCamera(prev => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy,
    }))
  }, [])

  const zoom = useCallback((delta: number, centerX: number, centerY: number) => {
    setCamera(prev => {
      const newScale = clampScale(prev.scale * (1 - delta * CAMERA.WHEEL_ZOOM_SPEED))
      const scaleFactor = newScale / prev.scale

      // Zoom toward cursor position
      const newX = centerX - (centerX - prev.x) * scaleFactor
      const newY = centerY - (centerY - prev.y) * scaleFactor

      return { x: newX, y: newY, scale: newScale }
    })
  }, [])

  const setCameraState = useCallback((state: Partial<CameraState>) => {
    setCamera(prev => ({ ...prev, ...state }))
  }, [])

  const animateTo = useCallback(async (x: number, y: number, scale?: number) => {
    const targetScale = scale ?? camera.scale
    const duration = prefersReducedMotion ? 0.01 : CAMERA.SNAP_DURATION

    setCamera({ x, y, scale: targetScale })

    if (scope.current) {
      await animate(
        scope.current,
        {
          x,
          y,
          scale: targetScale,
        },
        {
          type: prefersReducedMotion ? 'tween' : 'spring',
          stiffness: CAMERA.SPRING_STIFFNESS,
          damping: CAMERA.SPRING_DAMPING,
          duration: prefersReducedMotion ? duration : undefined,
        }
      )
    }
  }, [camera.scale, animate, scope, prefersReducedMotion])

  const centerOnNode = useCallback(async (
    nodeId: string,
    viewportWidth: number,
    viewportHeight: number
  ) => {
    const node = getNode(nodeId)
    if (!node) return

    // Calculate ideal scale based on node type
    let targetScale = CAMERA.DEFAULT_SCALE
    if (node.type === 'item') {
      targetScale = 1.0 // Zoom in more for detail items
    } else if (node.type === 'person') {
      targetScale = 0.9
    }

    // Get node dimensions
    const nodeSize = node.type === 'person' ? NODE.PERSON_SIZE :
                     node.type === 'category' ? NODE.CATEGORY_SIZE :
                     NODE.ITEM_SIZE

    // Calculate camera position to center node in viewport
    const targetX = (viewportWidth / 2) - (node.position.x + nodeSize.width / 2) * targetScale
    const targetY = (viewportHeight / 2) - (node.position.y + nodeSize.height / 2) * targetScale

    await animateTo(targetX, targetY, targetScale)
  }, [animateTo])

  const reset = useCallback(async (viewportWidth: number, viewportHeight: number) => {
    // Center the graph origin in viewport
    const targetX = viewportWidth / 2
    const targetY = viewportHeight / 2
    await animateTo(targetX, targetY, CAMERA.DEFAULT_SCALE)
  }, [animateTo])

  return [
    camera,
    { pan, zoom, setCamera: setCameraState, animateTo, centerOnNode, reset },
    scope
  ]
}
