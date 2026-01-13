'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Linkedin, Twitter, Mail, Copy, Check } from 'lucide-react'
import { getNodeContent, getNode } from '@/lib/graph-data'
import { personalInfo, type Project, type Experience, type Publication } from '@/lib/data'
import { PANEL } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ContentPanelProps {
  nodeId: string | null
  onClose: () => void
}

export function ContentPanel({ nodeId, onClose }: ContentPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const node = nodeId ? getNode(nodeId) : null
  const content = nodeId ? getNodeContent(nodeId) : null

  // Focus trap and escape handling
  useEffect(() => {
    if (!nodeId) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nodeId, onClose])

  // Focus panel when opened
  useEffect(() => {
    if (nodeId && panelRef.current) {
      panelRef.current.focus()
    }
  }, [nodeId])

  const slideVariants = {
    hidden: { x: PANEL.WIDTH, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: PANEL.WIDTH, opacity: 0 },
  }

  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: 'spring' as const, stiffness: 300, damping: 30 }

  return (
    <AnimatePresence mode="wait">
      {nodeId && node && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-[9]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            className={cn(
              'fixed top-0 right-0 h-full z-[10]',
              'bg-background border-l',
              'flex flex-col',
              'focus:outline-none'
            )}
            style={{ width: PANEL.WIDTH }}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            tabIndex={-1}
            role="dialog"
            aria-label={`Details for ${node.label}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h2 className="text-lg font-semibold">
                  {node.label}
                </h2>
                {node.sublabel && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {node.sublabel}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
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
      {/* Avatar and name */}
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={personalInfo.avatar} alt={personalInfo.name} />
          <AvatarFallback>
            {personalInfo.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">
            {personalInfo.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            Researcher & Engineer
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm leading-relaxed">
        {personalInfo.bio}
      </p>

      <Separator />

      {/* Links */}
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
        <h3 className="text-lg font-semibold">
          {data.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {data.organization}
        </p>
        <Badge variant="outline" className="mt-2">
          {data.date}
        </Badge>
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Highlights
        </h4>
        {data.details.map((detail, i) => (
          <p key={i} className="text-sm leading-relaxed pl-4 border-l-2 border-border">
            {detail}
          </p>
        ))}
      </div>

      <Separator />

      <TagList tags={data.tags} />
    </div>
  )
}

function ProjectContent({ data }: { data: Project }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold leading-snug">
          {data.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {data.organization}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline">{data.date}</Badge>
          <span className="text-xs text-muted-foreground">
            Advisor: {data.advisor}
          </span>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Details
        </h4>
        {data.details.map((detail, i) => (
          <p key={i} className="text-sm leading-relaxed pl-4 border-l-2 border-border">
            {detail}
          </p>
        ))}
      </div>

      <Separator />

      <TagList tags={data.tags} />
    </div>
  )
}

function PublicationContent({ data }: { data: Publication }) {
  const [copied, setCopied] = useState(false)

  const copyBibtex = async () => {
    await navigator.clipboard.writeText(data.bibtex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="secondary" className="mb-3">
          {data.type}
        </Badge>
        <h3 className="text-lg font-semibold leading-snug">
          {data.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          {data.authors}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {data.details}
        </p>
      </div>

      <Button asChild>
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-4 h-4 mr-2" />
          View Paper
        </a>
      </Button>

      <Separator />

      {/* BibTeX */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            BibTeX
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyBibtex}
            className="h-7 text-xs"
          >
            {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
        <Card>
          <CardContent className="p-3">
            <pre className="text-xs overflow-x-auto font-mono whitespace-pre-wrap">
              {data.bibtex}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CategoryContent({ nodeId }: { nodeId: string }) {
  const descriptions: Record<string, string> = {
    experience: 'Professional experience across AI research, startups, and major tech companies.',
    projects: 'Research projects in NLP, medical robotics, and language model reasoning.',
    publications: 'Academic publications in AI and robotics conferences.',
    achievements: 'Fellowships, grants, and awards recognizing academic and entrepreneurial work.',
  }

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed">
        {descriptions[nodeId] || 'Click on individual items to see details.'}
      </p>
      <p className="text-xs text-muted-foreground">
        Click on the connected nodes in the graph to explore individual items.
      </p>
    </div>
  )
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Technologies
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
