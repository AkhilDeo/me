"use client";

import * as React from "react";
import { Calendar, User, Building2 } from "lucide-react";
import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectsContent() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <pre className="text-xs text-muted-foreground font-mono mb-2">{`// projects/index.md`}</pre>
                <h1 className="text-2xl font-bold mb-2">Research Projects</h1>
                <p className="text-muted-foreground">
                    A collection of my research and engineering projects in AI, robotics, and software development.
                </p>
            </div>

            <div className="space-y-4">
                {projects.map((project, index) => (
                    <Card key={project.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <span className="text-primary font-mono text-sm">#{index + 1}</span>
                                        {project.title}
                                    </CardTitle>
                                    <CardDescription className="mt-1">
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                                            <span className="flex items-center gap-1">
                                                <Building2 className="h-3 w-3" />
                                                {project.organization}
                                            </span>
                                            {project.advisor && (
                                                <span className="flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    Advisor: {project.advisor}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {project.date}
                                            </span>
                                        </div>
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 mb-4">
                                {project.details.map((detail, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                                        <span className="text-primary shrink-0">→</span>
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-1">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export function ProjectDetailContent({ projectId }: { projectId: string }) {
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
        return (
            <div className="p-6">
                <p className="text-muted-foreground">Project not found.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <pre className="text-xs text-muted-foreground font-mono mb-4">{`// projects/${project.id}.md`}</pre>

            <h1 className="text-2xl font-bold mb-2">{project.title}</h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {project.organization}
                </span>
                {project.advisor && (
                    <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        Advisor: {project.advisor}
                    </span>
                )}
                <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {project.date}
                </span>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mb-6 border-l-4 border-primary">
                <h2 className="text-lg font-semibold mb-3">Details</h2>
                <ul className="space-y-3">
                    {project.details.map((detail, i) => (
                        <li key={i} className="flex gap-3">
                            <span className="text-primary font-mono shrink-0">{i + 1}.</span>
                            <span className="text-foreground">{detail}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-3">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}
