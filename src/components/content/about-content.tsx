"use client";

import * as React from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AboutContent() {
    return (
        <div className="prose prose-sm dark:prose-invert max-w-none p-6">
            <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-4xl font-bold text-primary">
                        AD
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-background" />
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2 mt-0">{personalInfo.name}</h1>
                    <p className="text-muted-foreground mb-4">
                        CS @ Johns Hopkins • AI/ML Researcher • Builder
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 mr-2" />
                                GitHub
                            </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-4 w-4 mr-2" />
                                LinkedIn
                            </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer">
                                <Twitter className="h-4 w-4 mr-2" />
                                Twitter
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mb-6 border-l-4 border-primary">
                <pre className="text-xs text-muted-foreground mb-2 font-mono">{`// about.md`}</pre>
                <p className="text-foreground leading-relaxed m-0">{personalInfo.bio}</p>
            </div>

            <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2 mb-6">
                {["Python", "PyTorch", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "vLLM", "LangChain", "Hugging Face", "Swift", "Java"].map((tech) => (
                    <Badge key={tech} variant="secondary">
                        {tech}
                    </Badge>
                ))}
            </div>

            <h2 className="text-xl font-semibold mb-4">Research Interests</h2>
            <div className="grid grid-cols-2 gap-4">
                {[
                    { title: "LLM Reasoning", desc: "Transparent reasoning & chain-of-thought" },
                    { title: "Social NLI", desc: "Sarcasm, irony, and humor understanding" },
                    { title: "Multi-Agent Systems", desc: "Collaborative AI architectures" },
                    { title: "Reinforcement Learning", desc: "Process rewards for LLMs" },
                ].map((interest) => (
                    <div key={interest.title} className="bg-muted/30 rounded-lg p-3">
                        <h3 className="font-medium text-sm mb-1">{interest.title}</h3>
                        <p className="text-xs text-muted-foreground m-0">{interest.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t">
                <h2 className="text-xl font-semibold mb-4">Contact</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="font-mono text-sm">{personalInfo.email}</span>
                </div>
            </div>
        </div>
    );
}
