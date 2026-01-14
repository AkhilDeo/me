'use client'

import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { NODE } from '@/lib/constants'
import type { GraphNode as GraphNodeType } from '@/lib/graph-data'
import { getNodeContent } from '@/lib/graph-data'
import { personalInfo, type Experience, type Project, type Publication } from '@/lib/data'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const nodeVariants = cva(
  // Base styles
  [
    'absolute rounded-xl border-2 transition-all duration-150',
    'flex flex-col justify-center px-5',
    'select-none cursor-pointer',
    'hover:shadow-[var(--node-shadow-hover)]',
  ],
  {
    variants: {
      type: {
        person: [
          'bg-[var(--node-bg)] border-[var(--node-border)]',
          'shadow-[var(--node-shadow)]',
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
        true: 'border-[var(--node-border-selected)] ring-2 ring-[var(--accent)]/30 shadow-lg',
        false: '',
      },
      isConnected: {
        true: 'opacity-100',
        false: '',
      },
      isFaded: {
        true: 'opacity-25 pointer-events-none',
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
  index: number
  isSelected: boolean
  isConnected: boolean
  isFaded: boolean
  onClick: (id: string) => void
}

export function GraphNode({
  node,
  index,
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

  const content = getNodeContent(node.id)

  return (
    <HoverCard openDelay={400} closeDelay={100}>
      <HoverCardTrigger asChild>
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
          tabIndex={isFaded ? -1 : 0}
          aria-label={`${node.label}${node.sublabel ? `, ${node.sublabel}` : ''}`}
          aria-pressed={isSelected}
          whileHover={{
            scale: NODE.HOVER_SCALE,
            transition: { duration: 0.15 },
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isFaded ? 0.25 : 1, scale: 1 }}
          transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.2) }}
        >
          {node.type === 'person' ? (
            <PersonNodeContent node={node} />
          ) : node.type === 'category' ? (
            <CategoryNodeContent node={node} />
          ) : (
            <ItemNodeContent node={node} content={content} />
          )}
        </motion.div>
      </HoverCardTrigger>

      {/* Hover Preview */}
      {content && !isFaded && (
        <HoverCardContent
          side="right"
          align="start"
          className="w-80 p-4"
          sideOffset={12}
        >
          <NodePreview node={node} content={content} />
        </HoverCardContent>
      )}
    </HoverCard>
  )
}

function PersonNodeContent({ node }: { node: GraphNodeType }) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="w-14 h-14 border-2 border-[var(--border)]">
        <AvatarImage src={personalInfo.avatar} alt={personalInfo.name} />
        <AvatarFallback className="text-lg font-semibold">AD</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-[var(--foreground)] text-base leading-tight">
          {node.label}
        </div>
        {node.sublabel && (
          <div className="text-[var(--muted-foreground)] text-sm mt-1">
            {node.sublabel}
          </div>
        )}
      </div>
    </div>
  )
}

function CategoryNodeContent({ node }: { node: GraphNodeType }) {
  return (
    <div className="text-center">
      <div className="font-bold text-[var(--foreground)] text-base tracking-tight">
        {node.label}
      </div>
      {node.sublabel && (
        <div className="text-[var(--muted-foreground)] text-xs mt-1">
          {node.sublabel}
        </div>
      )}
    </div>
  )
}

interface ItemNodeContentProps {
  node: GraphNodeType
  content: ReturnType<typeof getNodeContent>
}

function ItemNodeContent({ node, content }: ItemNodeContentProps) {
  // Extract date from content
  let date = ''
  if (content?.type === 'experience') {
    date = (content.data as Experience).date
  } else if (content?.type === 'project') {
    date = (content.data as Project).date
  } else if (content?.type === 'publication') {
    date = (content.data as Publication).type
  }

  return (
    <div className="space-y-1.5">
      <div className="font-semibold text-[var(--foreground)] text-sm leading-snug line-clamp-2">
        {node.label}
      </div>
      {node.sublabel && (
        <div className="text-[var(--muted-foreground)] text-xs line-clamp-1">
          {node.sublabel}
        </div>
      )}
      {date && (
        <div className="text-[var(--muted-foreground)] text-[10px] font-medium uppercase tracking-wide">
          {date}
        </div>
      )}
    </div>
  )
}

interface NodePreviewProps {
  node: GraphNodeType
  content: NonNullable<ReturnType<typeof getNodeContent>>
}

function NodePreview({ node, content }: NodePreviewProps) {
  if (content.type === 'person') {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={personalInfo.avatar} />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{personalInfo.name}</p>
            <p className="text-xs text-muted-foreground">Researcher & Engineer</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-3">
          {personalInfo.bio}
        </p>
      </div>
    )
  }

  if (content.type === 'experience') {
    const exp = content.data as Experience
    return (
      <div className="space-y-3">
        <div>
          <p className="font-semibold text-sm">{exp.title}</p>
          <p className="text-xs text-muted-foreground">{exp.organization}</p>
          <Badge variant="outline" className="mt-1.5 text-[10px]">{exp.date}</Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-3">
          {exp.details[0]}
        </p>
        <div className="flex flex-wrap gap-1">
          {exp.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
          ))}
        </div>
      </div>
    )
  }

  if (content.type === 'project') {
    const proj = content.data as Project
    return (
      <div className="space-y-3">
        <div>
          <p className="font-semibold text-sm leading-snug">{proj.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{proj.organization}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Advisor: {proj.advisor}
          </p>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-3">
          {proj.details[0]}
        </p>
        <div className="flex flex-wrap gap-1">
          {proj.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
          ))}
        </div>
      </div>
    )
  }

  if (content.type === 'publication') {
    const pub = content.data as Publication
    return (
      <div className="space-y-3">
        <div>
          <Badge variant="outline" className="text-[10px] mb-2">{pub.type}</Badge>
          <p className="font-semibold text-sm leading-snug">{pub.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{pub.authors}</p>
        </div>
        <p className="text-xs text-muted-foreground">{pub.details}</p>
      </div>
    )
  }

  return null
}
