"use client";

import * as React from "react";
import { ExternalLink, Copy, Check, ChevronDown, ChevronRight, FileText, BookOpen } from "lucide-react";
import { publications } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PublicationsContent() {
    const [expandedBibtex, setExpandedBibtex] = React.useState<string | null>(null);
    const [copiedId, setCopiedId] = React.useState<string | null>(null);

    const handleCopyBibtex = (bibtex: string, id: string) => {
        navigator.clipboard.writeText(bibtex);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <pre className="text-xs text-muted-foreground font-mono mb-2">{`// publications.md`}</pre>
                <h1 className="text-2xl font-bold mb-2">Publications</h1>
                <p className="text-muted-foreground">
                    Peer-reviewed papers and preprints in AI, NLP, and robotics.
                </p>
            </div>

            <div className="space-y-4">
                {publications.map((pub) => (
                    <div
                        key={pub.id}
                        className="bg-card rounded-lg border p-4 hover:border-primary/50 transition-colors"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                {pub.type === "Preprint" ? (
                                    <FileText className="h-5 w-5" />
                                ) : (
                                    <BookOpen className="h-5 w-5" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="font-semibold text-base leading-tight mb-1">
                                            {pub.url ? (
                                                <a
                                                    href={pub.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-primary transition-colors inline-flex items-center gap-1"
                                                >
                                                    {pub.title}
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            ) : (
                                                pub.title
                                            )}
                                        </h3>
                                        <p className="text-sm text-muted-foreground italic">{pub.authors}</p>
                                        <p className="text-sm text-muted-foreground">{pub.details}</p>
                                    </div>
                                    <Badge
                                        variant={pub.type === "Preprint" ? "outline" : "secondary"}
                                        className="shrink-0"
                                    >
                                        {pub.type}
                                    </Badge>
                                </div>

                                <div className="mt-3 flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs"
                                        onClick={() =>
                                            setExpandedBibtex(expandedBibtex === pub.id ? null : pub.id)
                                        }
                                    >
                                        {expandedBibtex === pub.id ? (
                                            <ChevronDown className="h-3 w-3 mr-1" />
                                        ) : (
                                            <ChevronRight className="h-3 w-3 mr-1" />
                                        )}
                                        BibTeX
                                    </Button>
                                    {pub.url && (
                                        <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                                            <a href={pub.url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-3 w-3 mr-1" />
                                                View Paper
                                            </a>
                                        </Button>
                                    )}
                                </div>

                                {expandedBibtex === pub.id && (
                                    <div className="mt-3 relative">
                                        <pre className="bg-muted rounded-lg p-3 text-xs overflow-x-auto font-mono">
                                            {pub.bibtex}
                                        </pre>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute top-2 right-2 h-7"
                                            onClick={() => handleCopyBibtex(pub.bibtex, pub.id)}
                                        >
                                            {copiedId === pub.id ? (
                                                <>
                                                    <Check className="h-3 w-3 mr-1 text-green-500" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-3 w-3 mr-1" />
                                                    Copy
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
