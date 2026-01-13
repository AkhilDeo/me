'use client'

import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { NODE } from '@/lib/constants'
import type { GraphNode as GraphNodeType } from '@/lib/graph-data'
import { personalInfo } from '@/lib/data'

const nodeVariants = cva(
  // Base styles
  [
    'absolute rounded-lg border transition-colors duration-150',
    'flex flex-col justify-center px-4',
    'select-none',
  ],
  {
    variants: {
      type: {
        person: [
          'bg-[var(--node-bg)] border-[var(--node-border)]',
          'shadow-[var(--node-shadow)]',
          'items-center text-center',
        ],
        category: [
          'bg-[var(--node-bg)] border-[var(--node-border)]',
          'shadow-[var(--node-shadow)]',
        ],
        item: [
          'bg-[var(--node-bg)] border-[var(--node-border)]',
          'shadow-[var(--node-shadow)]',
        ],
      },
      isSelected: {
        true: 'border-[var(--node-border-selected)] ring-2 ring-[var(--accent)]/20',
        false: '',
      },
      isConnected: {
        true: 'opacity-100',
        false: '',
      },
      isFaded: {
        true: 'opacity-30',
        false: 'opacity-100',
      },
    },
    defaultVariants: {
      type: 'item',
      isSelected: false,
      isConnected: false,
      isFaded: false,
    },
  }
)

interface GraphNodeProps extends VariantProps<typeof nodeVariants> {
  node: GraphNodeType
  isSelected: boolean
  isConnected: boolean
  isFaded: boolean
  onClick: (id: string) => void
}

export function GraphNode({
  node,
  isSelected,
  isConnected,
  isFaded,
  onClick,
}: GraphNodeProps) {
  const size = node.type === 'person' ? NODE.PERSON_SIZE :
               node.type === 'category' ? NODE.CATEGORY_SIZE :
               NODE.ITEM_SIZE

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick(node.id)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick(node.id)
    }
  }

  return (
    <motion.div
      className={cn(nodeVariants({ type: node.type, isSelected, isConnected, isFaded }))}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: size.width,
        height: size.height,
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${node.label}${node.sublabel ? `, ${node.sublabel}` : ''}`}
      aria-pressed={isSelected}
      whileHover={{
        scale: NODE.HOVER_SCALE,
        transition: { duration: 0.15 },
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isFaded ? 0.3 : 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {node.type === 'person' ? (
        <PersonNodeContent node={node} />
      ) : node.type === 'category' ? (
        <CategoryNodeContent node={node} />
      ) : (
        <ItemNodeContent node={node} />
      )}
    </motion.div>
  )
}

function PersonNodeContent({ node }: { node: GraphNodeType }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--muted)] overflow-hidden flex-shrink-0">
          <img
            src={personalInfo.avatar}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-left">
          <div className="font-semibold text-[var(--foreground)] text-sm leading-tight">
            {node.label}
          </div>
          {node.sublabel && (
            <div className="text-[var(--muted-foreground)] text-xs mt-0.5">
              {node.sublabel}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function CategoryNodeContent({ node }: { node: GraphNodeType }) {
  return (
    <>
      <div className="font-semibold text-[var(--foreground)] text-sm">
        {node.label}
      </div>
      {node.sublabel && (
        <div className="text-[var(--muted-foreground)] text-xs mt-0.5">
          {node.sublabel}
        </div>
      )}
    </>
  )
}

function ItemNodeContent({ node }: { node: GraphNodeType }) {
  return (
    <>
      <div className="font-medium text-[var(--foreground)] text-xs leading-tight line-clamp-2">
        {node.label}
      </div>
      {node.sublabel && (
        <div className="text-[var(--muted-foreground)] text-[10px] mt-1 line-clamp-1">
          {node.sublabel}
        </div>
      )}
    </>
  )
}
