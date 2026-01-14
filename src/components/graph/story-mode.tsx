'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useInView,
} from 'framer-motion'
import { ChevronDown, Map, ExternalLink, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { personalInfo, projects, experiences, publications, achievements } from '@/lib/data'
import { ThemeToggle } from '@/components/theme-toggle'
import { ModeToggle } from '@/components/graph/mode-toggle'
import { cn } from '@/lib/utils'

// Parallax text reveal component
function TextReveal({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.3'],
  })

  const words = children.split(' ')

  return (
    <div ref={ref} className={cn('flex flex-wrap gap-x-2 gap-y-1', className)}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        )
      })}
    </div>
  )
}

function Word({
  children,
  range,
  progress,
}: {
  children: string
  range: [number, number]
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {children}
    </motion.span>
  )
}

function ExperienceTimelineItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[0]
  index: number
}) {
  return (
    <motion.li
      className="relative pl-6 md:pl-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <motion.span
        className="absolute left-[-0.4rem] top-7 h-3 w-3 rounded-full bg-foreground ring-4 ring-background shadow-sm"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      />
      <div className="bg-card border rounded-2xl p-6 md:p-8">
        <Badge variant="outline" className="mb-3">
          {experience.date}
        </Badge>
        <h3 className="text-2xl md:text-3xl font-bold mb-2">{experience.title}</h3>
        <p className="text-lg text-muted-foreground mb-6">{experience.organization}</p>

        <ul className="space-y-3 mb-6">
          {experience.details.map((detail, j) => (
            <motion.li
              key={j}
              className="flex gap-3 text-sm md:text-base text-muted-foreground"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + j * 0.08 }}
            >
              <span className="text-primary mt-0.5 shrink-0">•</span>
              <span>{detail}</span>
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.li>
  )
}

// Research stack card with sticky depth
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const details = project.details.slice(0, 3)
  const gradients = [
    'from-blue-500/10 to-purple-500/10',
    'from-emerald-500/10 to-teal-500/10',
    'from-orange-500/10 to-pink-500/10',
    'from-violet-500/10 to-fuchsia-500/10',
  ]
  const accentColors = [
    'border-l-blue-500',
    'border-l-emerald-500',
    'border-l-orange-500',
    'border-l-violet-500',
  ]

  return (
    <motion.article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm hover:shadow-xl transition-all duration-300",
        "border-l-4",
        accentColors[index % accentColors.length]
      )}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      {/* Gradient background accent */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        gradients[index % gradients.length]
      )} />
      
      <div className="relative p-6 md:p-7">
        {/* Header - horizontal layout with index */}
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl font-black text-muted-foreground/10 leading-none">
            0{index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
              Research Track
            </p>
            <h3 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">
              {project.title}
            </h3>
          </div>
          <Badge variant="outline" className="shrink-0 self-start">
            {project.date}
          </Badge>
        </div>

        {/* Organization and Advisor - horizontal */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 mb-5 text-sm">
          <p className="text-muted-foreground">{project.organization}</p>
          <p className="text-muted-foreground">Advisor: {project.advisor}</p>
        </div>

        {/* Content grid - more horizontal */}
        <div className="grid gap-5 md:grid-cols-[1.5fr_1fr]">
          <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
            {details.map((detail, j) => (
              <li key={j} className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-primary">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col rounded-xl border border-border/60 bg-muted/30 p-4">
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Focus
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-2.5 py-1 text-[11px] font-medium"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function PublicationsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const totalPublications = publications.length
  const activeIndexRef = useRef(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const listRefs = useRef<Array<HTMLDivElement | null>>([])
  const isInView = useInView(sectionRef, { margin: '-25% 0px -25% 0px' })
  const isInViewRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const activePublication = publications[activeIndex]

  const setActiveIndexSafely = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(totalPublications - 1, index))
      if (clamped === activeIndexRef.current) {
        return
      }
      activeIndexRef.current = clamped
      setActiveIndex(clamped)
    },
    [totalPublications]
  )

  const updateActiveFromScroll = useCallback(() => {
    if (!isInViewRef.current) {
      return
    }

    const items = listRefs.current
    if (!items.length) {
      return
    }

    const viewportCenter = window.innerHeight * 0.52
    let bestIndex = activeIndexRef.current
    let bestDistance = Number.POSITIVE_INFINITY

    items.forEach((item, index) => {
      if (!item) {
        return
      }
      const rect = item.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const distance = Math.abs(center - viewportCenter)
      if (distance < bestDistance) {
        bestDistance = distance
        bestIndex = index
      }
    })

    setActiveIndexSafely(bestIndex)
  }, [setActiveIndexSafely])

  useEffect(() => {
    isInViewRef.current = isInView
  }, [isInView])

  useEffect(() => {
    if (!isInView) {
      return
    }
    if (rafRef.current !== null) {
      return
    }
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null
      updateActiveFromScroll()
    })
  }, [isInView, updateActiveFromScroll])

  useEffect(() => {
    const scheduleUpdate = () => {
      if (rafRef.current !== null) {
        return
      }
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        updateActiveFromScroll()
      })
    }

    const handleScroll = () => {
      scheduleUpdate()
    }

    const handleResize = () => {
      scheduleUpdate()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    scheduleUpdate()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [updateActiveFromScroll])

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
            Publications
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Peer-reviewed contributions to AI and robotics
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 pb-16">
            {publications.map((publication, i) => {
              const isActive = i === activeIndex
              const yearMatch = publication.details.match(/\b(19|20)\d{2}\b/)
              const year = yearMatch?.[0]

              return (
                <div
                  key={publication.id}
                  ref={(node) => {
                    listRefs.current[i] = node
                  }}
                  className={cn(
                    'w-full cursor-default rounded-xl border px-4 py-3 text-left transition-colors',
                    isActive
                      ? 'border-primary/40 bg-card shadow-sm'
                      : 'border-border/50 bg-transparent'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        <span>{publication.type}</span>
                        {year && <span>{year}</span>}
                      </div>
                      <h3 className="text-base md:text-lg font-semibold leading-snug mt-2">
                        {publication.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {publication.authors}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="lg:sticky lg:top-28 h-fit">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePublication.id}
                className="rounded-2xl border bg-card p-6 md:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <Badge variant="outline" className="mb-4">
                  {activePublication.type}
                </Badge>
                <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
                  {activePublication.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {activePublication.authors}
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  {activePublication.details}
                </p>
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <a
                    href={activePublication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Paper <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Story Mode component
export function StoryMode() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const footerLinks = [
    { label: 'GitHub', url: personalInfo.github },
    { label: 'LinkedIn', url: personalInfo.linkedin },
    { label: 'Twitter', url: personalInfo.twitter },
    {
      label: 'Email',
      url: `mailto:${personalInfo.email.replace('[at]', '@').replace('[dot]', '.')}`,
    },
  ]

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

  const switchToGraph = () => {
    router.push('/?mode=graph', { scroll: false })
  }

  return (
    <div ref={containerRef} className="relative bg-background">
      {/* UI Overlays */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
        <ModeToggle />
        <ThemeToggle />
      </div>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Hero Section - Full viewport with parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
          style={{ y: backgroundY }}
        />

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Avatar className="w-28 h-28 mx-auto mb-8 ring-4 ring-background shadow-2xl">
              <AvatarImage src={personalInfo.avatar} alt={personalInfo.name} />
              <AvatarFallback className="text-3xl font-bold">AD</AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {personalInfo.name}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {personalInfo.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-muted-foreground"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Experience - Vertical timeline */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
              Experience
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Building at the intersection of AI, engineering, and scale
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="absolute left-0 top-0 h-full w-px bg-border/60 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <ol className="relative space-y-8">
              {experiences.map((exp, i) => (
                <ExperienceTimelineItem key={exp.id} experience={exp} index={i} />
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Research Section - Sticky stack */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Research
            </h2>
            <TextReveal className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Advancing language understanding, transparent AI reasoning, and medical robotics
              through rigorous research and novel methods.
            </TextReveal>
          </motion.div>

          <div className="relative space-y-16 pb-12">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <PublicationsShowcase />

      {/* Achievements - List with staggered reveal */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Recognition
          </motion.h2>

          <div className="space-y-4">
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 p-6 bg-card border rounded-xl"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="text-2xl">★</span>
                <span className="text-lg">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="relative z-10 text-center max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Want to explore more?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            Switch to the interactive graph view to navigate freely and discover
            connections between projects, experiences, and publications.
          </p>
          <Button onClick={switchToGraph} size="lg" className="gap-3 text-lg px-8 py-6">
            <Map className="w-5 h-5" />
            Open Graph View
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} {personalInfo.name}</span>
          <div className="flex items-center gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
