'use client'

import { useRef, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { graphNodes, getConnectedNodes } from '@/lib/graph-data'
import { useCamera } from './hooks/use-camera'
import { useGestures } from './hooks/use-gestures'
import { GraphViewport } from './graph-viewport'
import { GraphGrid } from './graph-grid'
import { GraphNode } from './graph-node'
import { GraphEdges } from './graph-edges'
import { ContentPanel } from '../content-panel/content-panel'
import { GraphCommandPalette } from '../command-palette/graph-command'
import { ThemeToggle } from '../theme-toggle'
import { ModeToggle } from './mode-toggle'
import { useIsMobile } from '@/hooks/use-media-query'
import { MobileListView } from '../mobile/mobile-list-view'

export function GraphCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useIsMobile()

  const selectedNodeId = searchParams.get('node')

  const [camera, cameraActions, viewportRef] = useCamera()

  // Set up gesture handlers
  useGestures(containerRef, {
    onPan: cameraActions.pan,
    onZoom: cameraActions.zoom,
  })

  // Get connected nodes for highlighting
  const connectedNodeIds = useMemo(() => {
    if (!selectedNodeId) return []
    return getConnectedNodes(selectedNodeId)
  }, [selectedNodeId])

  // Handle node selection
  const handleNodeClick = useCallback((nodeId: string) => {
    router.push(`/?node=${nodeId}`, { scroll: false })
  }, [router])

  // Handle panel close
  const handleClosePanel = useCallback(() => {
    router.push('/', { scroll: false })
  }, [router])

  // Center on selected node when URL changes
  useEffect(() => {
    if (!containerRef.current) return

    const { width, height } = containerRef.current.getBoundingClientRect()

    if (selectedNodeId) {
      cameraActions.centerOnNode(selectedNodeId, width, height)
    }
  }, [selectedNodeId, cameraActions])

  // Initialize camera on mount
  useEffect(() => {
    if (!containerRef.current) return

    const { width, height } = containerRef.current.getBoundingClientRect()

    // If there's a node in URL, center on it; otherwise center the graph
    if (selectedNodeId) {
      cameraActions.centerOnNode(selectedNodeId, width, height)
    } else {
      cameraActions.reset(width, height)
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape closes panel
      if (e.key === 'Escape' && selectedNodeId) {
        e.preventDefault()
        handleClosePanel()
        return
      }

      // Reset view with 'r' or '0'
      if ((e.key === 'r' || e.key === '0') && !e.metaKey && !e.ctrlKey) {
        if (!containerRef.current) return
        const { width, height } = containerRef.current.getBoundingClientRect()
        cameraActions.reset(width, height)
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedNodeId, handleClosePanel, cameraActions])

  // Mobile fallback
  if (isMobile) {
    return <MobileListView selectedNodeId={selectedNodeId} />
  }

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-hidden bg-[var(--graph-bg)] touch-none"
      >
        {/* Grid background */}
        <GraphGrid scale={camera.scale} />

        {/* Viewport with transform */}
        <GraphViewport ref={viewportRef} camera={camera}>
          {/* Edges layer */}
          <GraphEdges
            selectedNodeId={selectedNodeId}
            connectedNodeIds={connectedNodeIds}
          />

          {/* Nodes */}
          {graphNodes.map(node => (
            <GraphNode
              key={node.id}
              node={node}
              isSelected={node.id === selectedNodeId}
              isConnected={connectedNodeIds.includes(node.id)}
              isFaded={selectedNodeId !== null && node.id !== selectedNodeId && !connectedNodeIds.includes(node.id)}
              onClick={handleNodeClick}
            />
          ))}
        </GraphViewport>

        {/* UI Overlays */}
        <div className="fixed top-4 right-4 flex items-center gap-2 z-[15]">
          <ModeToggle />
          <ThemeToggle />
        </div>

        {/* Zoom indicator */}
        <div className="fixed bottom-4 left-4 text-xs text-[var(--muted-foreground)] font-mono z-[15]">
          {Math.round(camera.scale * 100)}%
        </div>

        {/* Instructions */}
        <div className="fixed bottom-4 right-4 text-xs text-[var(--muted-foreground)] z-[15] hidden md:block">
          <span className="opacity-60">Drag to pan</span>
          <span className="mx-2 opacity-30">|</span>
          <span className="opacity-60">Scroll to zoom</span>
          <span className="mx-2 opacity-30">|</span>
          <kbd className="px-1.5 py-0.5 bg-[var(--muted)] rounded text-[10px]">⌘K</kbd>
          <span className="ml-1 opacity-60">search</span>
        </div>
      </div>

      {/* Content Panel */}
      <ContentPanel nodeId={selectedNodeId} onClose={handleClosePanel} />

      {/* Command Palette */}
      <GraphCommandPalette onSelectNode={handleNodeClick} />
    </>
  )
}
