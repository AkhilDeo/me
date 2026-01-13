'use client'

import { useCallback, useRef, useEffect } from 'react'
import { CAMERA } from '@/lib/constants'

interface GestureHandlers {
  onPan: (dx: number, dy: number) => void
  onZoom: (delta: number, centerX: number, centerY: number) => void
}

interface GestureState {
  isPanning: boolean
  lastX: number
  lastY: number
  lastPinchDistance: number
}

export function useGestures(
  containerRef: React.RefObject<HTMLElement | null>,
  handlers: GestureHandlers
) {
  const stateRef = useRef<GestureState>({
    isPanning: false,
    lastX: 0,
    lastY: 0,
    lastPinchDistance: 0,
  })

  // Mouse handlers
  const handleMouseDown = useCallback((e: MouseEvent) => {
    // Only pan with left mouse button, and not on interactive elements
    if (e.button !== 0) return
    const target = e.target as HTMLElement
    if (target.closest('button, a, [role="button"]')) return

    stateRef.current.isPanning = true
    stateRef.current.lastX = e.clientX
    stateRef.current.lastY = e.clientY

    // Change cursor
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing'
    }
  }, [containerRef])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!stateRef.current.isPanning) return

    const dx = e.clientX - stateRef.current.lastX
    const dy = e.clientY - stateRef.current.lastY

    stateRef.current.lastX = e.clientX
    stateRef.current.lastY = e.clientY

    handlers.onPan(dx, dy)
  }, [handlers])

  const handleMouseUp = useCallback(() => {
    stateRef.current.isPanning = false
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab'
    }
  }, [containerRef])

  // Wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()

    // Get cursor position relative to container
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const centerX = e.clientX - rect.left
    const centerY = e.clientY - rect.top

    // Use deltaY for zoom (pinch gestures on trackpad also fire wheel events)
    handlers.onZoom(e.deltaY, centerX, centerY)
  }, [containerRef, handlers])

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      // Single touch - pan
      stateRef.current.isPanning = true
      stateRef.current.lastX = e.touches[0].clientX
      stateRef.current.lastY = e.touches[0].clientY
    } else if (e.touches.length === 2) {
      // Two touches - prepare for pinch
      stateRef.current.isPanning = false
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      stateRef.current.lastPinchDistance = Math.hypot(dx, dy)
    }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault()

    if (e.touches.length === 1 && stateRef.current.isPanning) {
      // Pan
      const dx = e.touches[0].clientX - stateRef.current.lastX
      const dy = e.touches[0].clientY - stateRef.current.lastY

      stateRef.current.lastX = e.touches[0].clientX
      stateRef.current.lastY = e.touches[0].clientY

      handlers.onPan(dx, dy)
    } else if (e.touches.length === 2) {
      // Pinch zoom
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const distance = Math.hypot(dx, dy)

      if (stateRef.current.lastPinchDistance > 0) {
        const delta = (stateRef.current.lastPinchDistance - distance) * CAMERA.PINCH_ZOOM_SPEED * 100

        // Zoom center is midpoint of two touches
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect) {
          const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left
          const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top
          handlers.onZoom(delta, centerX, centerY)
        }
      }

      stateRef.current.lastPinchDistance = distance
    }
  }, [containerRef, handlers])

  const handleTouchEnd = useCallback(() => {
    stateRef.current.isPanning = false
    stateRef.current.lastPinchDistance = 0
  }, [])

  // Attach event listeners
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Mouse events
    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    // Wheel (with passive: false to allow preventDefault)
    container.addEventListener('wheel', handleWheel, { passive: false })

    // Touch events
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)

    // Set initial cursor
    container.style.cursor = 'grab'

    return () => {
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  ])

  return {
    isPanning: stateRef.current.isPanning
  }
}
