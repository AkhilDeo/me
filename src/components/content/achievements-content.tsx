"use client";

import * as React from "react";
import { Trophy, Award, Star, Sparkles } from "lucide-react";
import { achievements } from "@/lib/data";

const iconMap = [Trophy, Award, Star, Sparkles, Trophy];

export function AchievementsContent() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <pre className="text-xs text-muted-foreground font-mono mb-2">{`// achievements.md`}</pre>
                <h1 className="text-2xl font-bold mb-2">Achievements & Awards</h1>
                <p className="text-muted-foreground">
                    Recognition and honors received throughout my academic and professional journey.
                </p>
            </div>

            <div className="grid gap-4">
                {achievements.map((achievement, index) => {
                    const Icon = iconMap[index % iconMap.length];
                    return (
                        <div
                            key={index}
                            className="flex items-center gap-4 bg-card rounded-lg border p-4 hover:border-primary/50 transition-colors"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-400/20">
                                <Icon className="h-6 w-6 text-yellow-500" />
                            </div>
                            <div>
                                <h3 className="font-medium">{achievement}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {index === 0 && "Graduate research fellowship"}
                                    {index === 1 && "Entrepreneurship funding"}
                                    {index === 2 && "Academic travel support"}
                                    {index === 3 && "Student initiative recognition"}
                                    {index === 4 && "Hackathon awards"}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 p-4 bg-muted/30 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-muted-foreground italic">
                    &ldquo;The only way to do great work is to love what you do.&rdquo; — Steve Jobs
                </p>
            </div>
        </div>
    );
}
