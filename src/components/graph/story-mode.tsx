'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ChevronDown, Map } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { personalInfo, projects, experiences, publications, achievements } from '@/lib/data'
import { storySequence, getNode, getNodeContent } from '@/lib/graph-data'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/use-media-query'

export function StoryMode() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeSection, setActiveSection] = useState(0)

  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Switch to graph mode
  const switchToGraph = () => {
    router.push('/', { scroll: false })
  }

  return (
    <div className="fixed inset-0 bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between px-6 py-3 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={personalInfo.avatar} alt={personalInfo.name} />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm">{personalInfo.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={switchToGraph}
              className="gap-2"
            >
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Explore Graph</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Progress indicator */}
      <motion.div
        className="fixed top-[57px] left-0 right-0 h-0.5 bg-primary z-20 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Scrollable Content */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto scroll-smooth pt-[60px]"
      >
        {/* Hero Section */}
        <section className="min-h-[80vh] flex items-center justify-center px-6">
          <motion.div
            className="text-center max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Avatar className="w-24 h-24 mx-auto mb-6">
              <AvatarImage src={personalInfo.avatar} alt={personalInfo.name} />
              <AvatarFallback className="text-2xl">AD</AvatarFallback>
            </Avatar>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              {personalInfo.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {personalInfo.bio}
            </p>
            <motion.div
              className="flex items-center justify-center gap-1 text-muted-foreground"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-5 h-5" />
              <span className="text-sm">Scroll to explore</span>
            </motion.div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <StorySection
          title="Experience"
          subtitle="Building at the intersection of AI and engineering"
        >
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <StoryCard key={exp.id} index={i}>
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{exp.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {exp.organization}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{exp.date}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {exp.details.map((detail, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StoryCard>
            ))}
          </div>
        </StorySection>

        {/* Research Section */}
        <StorySection
          title="Research"
          subtitle="Advancing language understanding and medical robotics"
        >
          <div className="space-y-6">
            {projects.map((proj, i) => (
              <StoryCard key={proj.id} index={i}>
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="leading-snug">{proj.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {proj.organization}
                        </CardDescription>
                        <p className="text-xs text-muted-foreground mt-1">
                          Advisor: {proj.advisor} | {proj.date}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {proj.details.map((detail, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {proj.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StoryCard>
            ))}
          </div>
        </StorySection>

        {/* Publications Section */}
        <StorySection
          title="Publications"
          subtitle="Peer-reviewed contributions to AI and robotics"
        >
          <div className="space-y-6">
            {publications.map((pub, i) => (
              <StoryCard key={pub.id} index={i}>
                <Card>
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">
                      {pub.type}
                    </Badge>
                    <CardTitle className="leading-snug">{pub.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {pub.authors}
                    </CardDescription>
                    <p className="text-xs text-muted-foreground mt-1">
                      {pub.details}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" size="sm">
                      <a href={pub.url} target="_blank" rel="noopener noreferrer">
                        View Paper
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </StoryCard>
            ))}
          </div>
        </StorySection>

        {/* Achievements Section */}
        <StorySection
          title="Recognition"
          subtitle="Awards and honors"
        >
          <StoryCard index={0}>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-primary text-lg">★</span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </StoryCard>
        </StorySection>

        {/* Footer CTA */}
        <section className="min-h-[50vh] flex items-center justify-center px-6 pb-20">
          <motion.div
            className="text-center max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">Want to explore more?</h2>
            <p className="text-muted-foreground mb-6">
              Switch to the interactive graph view to navigate freely and discover connections between projects, experiences, and publications.
            </p>
            <Button onClick={switchToGraph} size="lg" className="gap-2">
              <Map className="w-5 h-5" />
              Open Graph View
            </Button>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

interface StorySectionProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

function StorySection({ title, subtitle, children }: StorySectionProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </motion.div>
        {children}
      </div>
    </section>
  )
}

interface StoryCardProps {
  children: React.ReactNode
  index: number
}

function StoryCard({ children, index }: StoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {children}
    </motion.div>
  )
}
