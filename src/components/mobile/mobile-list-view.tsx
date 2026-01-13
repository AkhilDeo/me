'use client'

import { useRouter } from 'next/navigation'
import { User, Briefcase, FlaskConical, BookOpen, Award, ExternalLink, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { personalInfo, projects, experiences, publications, achievements } from '@/lib/data'
import { ThemeToggle } from '@/components/theme-toggle'
import { ContentPanel } from '@/components/content-panel/content-panel'
import { cn } from '@/lib/utils'

interface MobileListViewProps {
  selectedNodeId: string | null
}

export function MobileListView({ selectedNodeId }: MobileListViewProps) {
  const router = useRouter()

  const handleSelect = (nodeId: string) => {
    router.push(`/?node=${nodeId}`, { scroll: false })
  }

  const handleClose = () => {
    router.push('/', { scroll: false })
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-lg font-semibold">Portfolio</h1>
            <ThemeToggle />
          </div>
        </header>

        <ScrollArea className="h-[calc(100vh-57px)]">
          <div className="p-4 space-y-6">
            {/* Profile Card */}
            <Card
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handleSelect('me')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={personalInfo.avatar} alt={personalInfo.name} />
                    <AvatarFallback>
                      {personalInfo.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{personalInfo.name}</CardTitle>
                    <CardDescription>Researcher & Engineer</CardDescription>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardHeader>
            </Card>

            {/* Experience Section */}
            <section>
              <div className="flex items-center gap-2 mb-3 px-1">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Experience
                </h2>
              </div>
              <div className="space-y-2">
                {experiences.map(exp => (
                  <Card
                    key={exp.id}
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => handleSelect(exp.id)}
                  >
                    <CardHeader className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-sm font-medium truncate">
                            {exp.organization}
                          </CardTitle>
                          <CardDescription className="text-xs truncate">
                            {exp.title}
                          </CardDescription>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            {/* Research Section */}
            <section>
              <div className="flex items-center gap-2 mb-3 px-1">
                <FlaskConical className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Research
                </h2>
              </div>
              <div className="space-y-2">
                {projects.map(proj => (
                  <Card
                    key={proj.id}
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => handleSelect(proj.id)}
                  >
                    <CardHeader className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-sm font-medium line-clamp-1">
                            {proj.title}
                          </CardTitle>
                          <CardDescription className="text-xs truncate">
                            {proj.organization.split(' ').slice(0, 4).join(' ')}
                          </CardDescription>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            {/* Publications Section */}
            <section>
              <div className="flex items-center gap-2 mb-3 px-1">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Publications
                </h2>
              </div>
              <div className="space-y-2">
                {publications.map(pub => (
                  <Card
                    key={pub.id}
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => handleSelect(pub.id)}
                  >
                    <CardHeader className="py-3 px-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                              {pub.type}
                            </Badge>
                          </div>
                          <CardTitle className="text-sm font-medium line-clamp-2">
                            {pub.title}
                          </CardTitle>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            {/* Achievements Section */}
            <section>
              <div className="flex items-center gap-2 mb-3 px-1">
                <Award className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Recognition
                </h2>
              </div>
              <Card>
                <CardContent className="py-3 px-4">
                  <ul className="space-y-2">
                    {achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Footer spacing */}
            <div className="h-8" />
          </div>
        </ScrollArea>
      </div>

      {/* Content Panel (full screen on mobile) */}
      <ContentPanel nodeId={selectedNodeId} onClose={handleClose} />
    </>
  )
}
