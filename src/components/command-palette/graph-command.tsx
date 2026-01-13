'use client'

import { useEffect, useState, useCallback } from 'react'
import { User, Briefcase, FlaskConical, BookOpen, Award, Building, FileText } from 'lucide-react'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { graphNodes, type GraphNode } from '@/lib/graph-data'

interface GraphCommandPaletteProps {
  onSelectNode: (nodeId: string) => void
}

export function GraphCommandPalette({ onSelectNode }: GraphCommandPaletteProps) {
  const [open, setOpen] = useState(false)

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSelect = useCallback((nodeId: string) => {
    setOpen(false)
    onSelectNode(nodeId)
  }, [onSelectNode])

  // Group nodes by type
  const personNodes = graphNodes.filter(n => n.type === 'person')
  const categoryNodes = graphNodes.filter(n => n.type === 'category')
  const experienceNodes = graphNodes.filter(n => n.data?.source === 'experience')
  const projectNodes = graphNodes.filter(n => n.data?.source === 'project')
  const publicationNodes = graphNodes.filter(n => n.data?.source === 'publication')

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Navigate"
      description="Search for a section or item to navigate to"
    >
      <CommandInput placeholder="Search nodes..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Person */}
        <CommandGroup heading="Profile">
          {personNodes.map(node => (
            <CommandItem
              key={node.id}
              value={`${node.label} ${node.sublabel || ''}`}
              onSelect={() => handleSelect(node.id)}
            >
              <User className="mr-2 h-4 w-4" />
              <span>{node.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        {/* Sections */}
        <CommandGroup heading="Sections">
          {categoryNodes.map(node => (
            <CommandItem
              key={node.id}
              value={`${node.label} ${node.sublabel || ''}`}
              onSelect={() => handleSelect(node.id)}
            >
              <NodeIcon node={node} className="mr-2 h-4 w-4" />
              <span>{node.label}</span>
              {node.sublabel && (
                <span className="ml-auto text-xs text-muted-foreground">
                  {node.sublabel}
                </span>
              )}
            </CommandItem>
          ))}
        </CommandGroup>

        {/* Experience */}
        <CommandGroup heading="Experience">
          {experienceNodes.map(node => (
            <CommandItem
              key={node.id}
              value={`${node.label} ${node.sublabel || ''}`}
              onSelect={() => handleSelect(node.id)}
            >
              <Building className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span>{node.label}</span>
                {node.sublabel && (
                  <span className="text-xs text-muted-foreground">
                    {node.sublabel}
                  </span>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        {/* Projects */}
        <CommandGroup heading="Research">
          {projectNodes.map(node => (
            <CommandItem
              key={node.id}
              value={`${node.label} ${node.sublabel || ''}`}
              onSelect={() => handleSelect(node.id)}
            >
              <FlaskConical className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span>{node.label}</span>
                {node.sublabel && (
                  <span className="text-xs text-muted-foreground">
                    {node.sublabel}
                  </span>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        {/* Publications */}
        <CommandGroup heading="Publications">
          {publicationNodes.map(node => (
            <CommandItem
              key={node.id}
              value={`${node.label} ${node.sublabel || ''}`}
              onSelect={() => handleSelect(node.id)}
            >
              <FileText className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span>{node.label}</span>
                {node.sublabel && (
                  <span className="text-xs text-muted-foreground">
                    {node.sublabel}
                  </span>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

function NodeIcon({ node, className }: { node: GraphNode; className?: string }) {
  switch (node.id) {
    case 'experience':
      return <Briefcase className={className} />
    case 'projects':
      return <FlaskConical className={className} />
    case 'publications':
      return <BookOpen className={className} />
    case 'achievements':
      return <Award className={className} />
    default:
      return <User className={className} />
  }
}
