"use client";

import * as React from "react";
import { Calendar, Building2, ArrowRight } from "lucide-react";
import { experiences } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function ExperienceContent() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <pre className="text-xs text-muted-foreground font-mono mb-2">{`// experience/index.md`}</pre>
                <h1 className="text-2xl font-bold mb-2">Work Experience</h1>
                <p className="text-muted-foreground">
                    My professional journey in software engineering and AI research.
                </p>
            </div>

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />

                <div className="space-y-8">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="relative pl-8">
                            {/* Timeline dot */}
                            <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                            <div className="bg-card rounded-lg border p-4 hover:border-primary/50 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-lg">{exp.title}</h3>
                                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                            <Building2 className="h-4 w-4" />
                                            <span>{exp.organization}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                                        <Calendar className="h-3 w-3" />
                                        <span>{exp.date}</span>
                                    </div>
                                </div>

                                <ul className="space-y-2 mb-3">
                                    {exp.details.map((detail, i) => (
                                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                                            <ArrowRight className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-1">
                                    {exp.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function ExperienceDetailContent({ experienceId }: { experienceId: string }) {
    const exp = experiences.find((e) => e.id === experienceId);

    if (!exp) {
        return (
            <div className="p-6">
                <p className="text-muted-foreground">Experience not found.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <pre className="text-xs text-muted-foreground font-mono mb-4">{`// experience/${exp.id}.md`}</pre>

            <h1 className="text-2xl font-bold mb-1">{exp.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {exp.organization}
                </span>
                <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {exp.date}
                </span>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mb-6 border-l-4 border-primary">
                <h2 className="text-lg font-semibold mb-3">Responsibilities & Achievements</h2>
                <ul className="space-y-3">
                    {exp.details.map((detail, i) => (
                        <li key={i} className="flex gap-3">
                            <span className="text-primary font-mono shrink-0">{i + 1}.</span>
                            <span className="text-foreground">{detail}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-3">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}
