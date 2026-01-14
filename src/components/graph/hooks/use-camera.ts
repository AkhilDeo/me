'use client'

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { CAMERA, NODE } from '@/lib/constants'
import { getNode } from '@/lib/graph-data'
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
  centerOnNode: (nodeId: string, viewportWidth: number, viewportHeight: number) => void
  reset: (viewportWidth: number, viewportHeight: number) => void
}

const initialState: CameraState = {
  x: 0,
  y: 0,
  scale: CAMERA.DEFAULT_SCALE,
}

export function useCamera(): [CameraState, CameraActions, React.RefObject<HTMLDivElement | null>] {
  const [camera, setCamera] = useState<CameraState>(initialState)
  const cameraRef = useRef<CameraState>(initialState)
  const viewportRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const animationRef = useRef<number | null>(null)
  const targetRef = useRef<CameraState>(initialState)

  const clampScale = (scale: number) =>
    Math.max(CAMERA.MIN_SCALE, Math.min(CAMERA.MAX_SCALE, scale))

  // Cancel any ongoing animation
  const cancelAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  // Animate camera to target position
  const animateTo = useCallback((targetX: number, targetY: number, targetScale: number) => {
    cancelAnimation()

    targetRef.current = { x: targetX, y: targetY, scale: targetScale }

    if (prefersReducedMotion) {
      // Instant transition for reduced motion
      setCamera({ x: targetX, y: targetY, scale: targetScale })
      return
    }

    const startTime = performance.now()
    const startState = { ...cameraRef.current }
    const duration = CAMERA.SNAP_DURATION * 1000 // Convert to ms

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)

      const newState = {
        x: startState.x + (targetX - startState.x) * eased,
        y: startState.y + (targetY - startState.y) * eased,
        scale: startState.scale + (targetScale - startState.scale) * eased,
      }

      setCamera(newState)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        animationRef.current = null
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [cancelAnimation, prefersReducedMotion])

  // Cleanup on unmount
  useEffect(() => {
    return () => cancelAnimation()
  }, [cancelAnimation])

  useEffect(() => {
    cameraRef.current = camera
  }, [camera])

  const pan = useCallback((dx: number, dy: number) => {
    cancelAnimation()
    setCamera(prev => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy,
    }))
  }, [cancelAnimation])

  const zoom = useCallback((delta: number, centerX: number, centerY: number) => {
    cancelAnimation()
    setCamera(prev => {
      const newScale = clampScale(prev.scale * (1 - delta * CAMERA.WHEEL_ZOOM_SPEED))
      const scaleFactor = newScale / prev.scale

      // Zoom toward cursor position
      const newX = centerX - (centerX - prev.x) * scaleFactor
      const newY = centerY - (centerY - prev.y) * scaleFactor

      return { x: newX, y: newY, scale: newScale }
    })
  }, [cancelAnimation])

  const setCameraState = useCallback((state: Partial<CameraState>) => {
    cancelAnimation()
    setCamera(prev => ({ ...prev, ...state }))
  }, [cancelAnimation])

  const centerOnNode = useCallback((
    nodeId: string,
    viewportWidth: number,
    viewportHeight: number
  ) => {
    const node = getNode(nodeId)
    if (!node) return

    // Calculate ideal scale based on node type
    let targetScale = CAMERA.DEFAULT_SCALE
    if (node.type === 'item') {
      targetScale = 1.0
    } else if (node.type === 'person') {
      targetScale = 0.9
    }

    // Get node dimensions
    const nodeSize = node.type === 'person' ? NODE.PERSON_SIZE :
                     node.type === 'category' ? NODE.CATEGORY_SIZE :
                     NODE.ITEM_SIZE

    // Calculate camera position to center node in viewport
    // Account for panel width on right side (only if viewport is wide enough)
    const panelOffset = viewportWidth > 1024 ? 220 : 0
    const targetX = ((viewportWidth - panelOffset) / 2) - (node.position.x + nodeSize.width / 2) * targetScale
    const targetY = (viewportHeight / 2) - (node.position.y + nodeSize.height / 2) * targetScale

    animateTo(targetX, targetY, targetScale)
  }, [animateTo])

  const reset = useCallback((viewportWidth: number, viewportHeight: number) => {
    // Center the graph origin in viewport
    const targetX = viewportWidth / 2
    const targetY = viewportHeight / 2
    animateTo(targetX, targetY, CAMERA.DEFAULT_SCALE)
  }, [animateTo])

  const actions = useMemo<CameraActions>(() => ({
    pan,
    zoom,
    setCamera: setCameraState,
    centerOnNode,
    reset,
  }), [pan, zoom, setCameraState, centerOnNode, reset])

  return [camera, actions, viewportRef]
}
