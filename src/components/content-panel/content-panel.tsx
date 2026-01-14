'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { getNode, getNodeContent } from '@/lib/graph-data'
import { personalInfo, type Experience, type Project, type Publication } from '@/lib/data'
import { PANEL } from '@/lib/constants'
import { usePrefersReducedMotion } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface ContentPanelProps {
  nodeId: string | null
  onClose: () => void
}

export function ContentPanel({ nodeId, onClose }: ContentPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const node = nodeId ? getNode(nodeId) : null
  const content = nodeId ? getNodeContent(nodeId) : null

  useEffect(() => {
    if (!nodeId) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nodeId, onClose])

  useEffect(() => {
    if (nodeId && panelRef.current) {
      panelRef.current.focus()
    }
  }, [nodeId])

  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: 'spring' as const, stiffness: 320, damping: 32 }

  return (
    <AnimatePresence mode="wait">
      {nodeId && node && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-[9]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            className="fixed top-0 right-0 h-full z-[10] bg-background border-l flex flex-col focus:outline-none"
            style={{ width: PANEL.WIDTH }}
            initial={{ x: PANEL.WIDTH, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: PANEL.WIDTH, opacity: 0 }}
            transition={transition}
            tabIndex={-1}
            role="dialog"
            aria-label={`Details for ${node.label}`}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h2 className="text-lg font-semibold">{node.label}</h2>
                {node.sublabel && (
                  <p className="text-sm text-muted-foreground mt-0.5">{node.sublabel}</p>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close panel">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="px-6 py-6">
                {content?.type === 'person' && <PersonContent />}
                {content?.type === 'experience' && <ExperienceContent data={content.data as Experience} />}
                {content?.type === 'project' && <ProjectContent data={content.data as Project} />}
                {content?.type === 'publication' && <PublicationContent data={content.data as Publication} />}
                {!content && node.type === 'category' && <CategoryContent nodeId={nodeId} />}
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function PersonContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={personalInfo.avatar} alt={personalInfo.name} />
          <AvatarFallback>
            {personalInfo.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">{personalInfo.name}</h3>
          <p className="text-sm text-muted-foreground">Researcher & Engineer</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed">{personalInfo.bio}</p>

      <Separator />

      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Connect
        </h4>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer">
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={`mailto:${personalInfo.email.replace('[at]', '@').replace('[dot]', '.')}`}>
              <Mail className="w-4 h-4 mr-2" />
              Email
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

function ExperienceContent({ data }: { data: Experience }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{data.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{data.organization}</p>
        <Badge variant="outline" className="mt-2">{data.date}</Badge>
      </div>

      <Separator />

      <ul className="space-y-3">
        {data.details.map((detail, i) => (
          <li key={i} className="flex gap-3 text-sm text-muted-foreground">
            <span className="text-primary mt-0.5">•</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {data.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
        ))}
      </div>
    </div>
  )
}

function ProjectContent({ data }: { data: Project }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{data.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{data.organization}</p>
        <p className="text-xs text-muted-foreground mt-1">Advisor: {data.advisor}</p>
        <Badge variant="outline" className="mt-2">{data.date}</Badge>
      </div>

      <Separator />

      <ul className="space-y-3">
        {data.details.map((detail, i) => (
          <li key={i} className="flex gap-3 text-sm text-muted-foreground">
            <span className="text-primary mt-0.5">•</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {data.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
        ))}
      </div>
    </div>
  )
}

function PublicationContent({ data }: { data: Publication }) {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="outline" className="mb-2">{data.type}</Badge>
        <h3 className="text-lg font-semibold">{data.title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{data.authors}</p>
        <p className="text-sm text-muted-foreground mt-2">{data.details}</p>
      </div>

      <Button asChild variant="outline" size="sm" className="gap-2">
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          View Paper <ExternalLink className="w-4 h-4" />
        </a>
      </Button>
    </div>
  )
}

function CategoryContent({ nodeId }: { nodeId: string }) {
  const descriptions: Record<string, string> = {
    experience: 'Professional roles spanning AI, product engineering, and systems at scale.',
    projects: 'Research projects in NLP, medical robotics, and language model reasoning.',
    publications: 'Peer-reviewed work in AI, reasoning, and robotics.',
    achievements: 'Awards and recognitions across research and engineering.',
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {descriptions[nodeId] || 'Click on individual items to see details.'}
      </p>
      <p className="text-sm text-muted-foreground">
        Select a connected node in the graph to explore individual items.
      </p>
    </div>
  )
}
