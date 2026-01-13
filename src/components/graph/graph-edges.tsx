'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { graphNodes, graphEdges, getNode, type GraphEdge } from '@/lib/graph-data'
import { NODE } from '@/lib/constants'

interface GraphEdgesProps {
  selectedNodeId: string | null
  connectedNodeIds: string[]
}

export function GraphEdges({ selectedNodeId, connectedNodeIds }: GraphEdgesProps) {
  // Calculate bounding box for SVG
  const bounds = useMemo(() => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity

    graphNodes.forEach(node => {
      const size = node.type === 'person' ? NODE.PERSON_SIZE :
                   node.type === 'category' ? NODE.CATEGORY_SIZE :
                   NODE.ITEM_SIZE
      minX = Math.min(minX, node.position.x)
      minY = Math.min(minY, node.position.y)
      maxX = Math.max(maxX, node.position.x + size.width)
      maxY = Math.max(maxY, node.position.y + size.height)
    })

    // Add padding
    const padding = 200
    return {
      x: minX - padding,
      y: minY - padding,
      width: maxX - minX + padding * 2,
      height: maxY - minY + padding * 2,
    }
  }, [])

  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        left: bounds.x,
        top: bounds.y,
        width: bounds.width,
        height: bounds.height,
        overflow: 'visible',
      }}
    >
      {graphEdges.map((edge, i) => (
        <Edge
          key={`${edge.from}-${edge.to}`}
          edge={edge}
          offsetX={-bounds.x}
          offsetY={-bounds.y}
          isHighlighted={
            selectedNodeId !== null &&
            (edge.from === selectedNodeId || edge.to === selectedNodeId)
          }
          isFaded={
            selectedNodeId !== null &&
            edge.from !== selectedNodeId &&
            edge.to !== selectedNodeId
          }
          index={i}
        />
      ))}
    </svg>
  )
}

interface EdgeProps {
  edge: GraphEdge
  offsetX: number
  offsetY: number
  isHighlighted: boolean
  isFaded: boolean
  index: number
}

function Edge({ edge, offsetX, offsetY, isHighlighted, isFaded, index }: EdgeProps) {
  const fromNode = getNode(edge.from)
  const toNode = getNode(edge.to)

  if (!fromNode || !toNode) return null

  // Get node sizes
  const fromSize = fromNode.type === 'person' ? NODE.PERSON_SIZE :
                   fromNode.type === 'category' ? NODE.CATEGORY_SIZE :
                   NODE.ITEM_SIZE
  const toSize = toNode.type === 'person' ? NODE.PERSON_SIZE :
                 toNode.type === 'category' ? NODE.CATEGORY_SIZE :
                 NODE.ITEM_SIZE

  // Calculate center points
  const x1 = fromNode.position.x + fromSize.width / 2 + offsetX
  const y1 = fromNode.position.y + fromSize.height / 2 + offsetY
  const x2 = toNode.position.x + toSize.width / 2 + offsetX
  const y2 = toNode.position.y + toSize.height / 2 + offsetY

  // Calculate control points for curved line
  const dx = x2 - x1
  const dy = y2 - y1
  const curvature = edge.type === 'secondary' ? 0.3 : 0.15

  // Perpendicular offset for curve
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const nx = -dy * curvature
  const ny = dx * curvature

  const path = `M ${x1} ${y1} Q ${mx + nx} ${my + ny} ${x2} ${y2}`

  return (
    <motion.path
      d={path}
      fill="none"
      strokeWidth={edge.type === 'secondary' ? 1 : 1.5}
      strokeDasharray={edge.type === 'secondary' ? '4 4' : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: 1,
        opacity: isFaded ? 0.1 : isHighlighted ? 1 : 0.4,
        stroke: isHighlighted ? 'var(--edge-stroke-active)' : 'var(--edge-stroke)',
      }}
      transition={{
        pathLength: { duration: 0.8, delay: index * 0.02 },
        opacity: { duration: 0.2 },
        stroke: { duration: 0.2 },
      }}
    />
  )
}
