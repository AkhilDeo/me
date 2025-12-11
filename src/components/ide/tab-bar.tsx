"use client";

import * as React from "react";
import { X, FileText, FileCode, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Tab {
    path: string;
    name: string;
    icon?: string;
}

interface TabBarProps {
    tabs: Tab[];
    activeTab: string;
    onTabSelect: (path: string) => void;
    onTabClose: (path: string) => void;
    onTabReorder: (tabs: Tab[]) => void;
}

const iconMap: Record<string, React.ElementType> = {
    "file-text": FileText,
    "file-code": FileCode,
    trophy: Trophy,
};

export function TabBar({ tabs, activeTab, onTabSelect, onTabClose, onTabReorder }: TabBarProps) {
    const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", index.toString());
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOverIndex(index);
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            setDragOverIndex(null);
            return;
        }

        const newTabs = [...tabs];
        const [draggedTab] = newTabs.splice(draggedIndex, 1);
        newTabs.splice(dropIndex, 0, draggedTab);
        onTabReorder(newTabs);

        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    return (
        <div className="flex h-[35px] items-center bg-card border-b border-border">
            <ScrollArea className="w-full">
                <div className="flex">
                    {tabs.map((tab, index) => {
                        const Icon = iconMap[tab.icon || "file-text"] || FileText;
                        const isActive = activeTab === tab.path;
                        const isDragging = draggedIndex === index;
                        const isDragOver = dragOverIndex === index;

                        return (
                            <div
                                key={tab.path}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                className={cn(
                                    "group flex h-[35px] items-center gap-1.5 px-3 text-[13px] cursor-pointer transition-all border-r border-border",
                                    isActive
                                        ? "bg-background text-foreground border-t-2 border-t-primary"
                                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-secondary-foreground",
                                    isDragging && "opacity-50",
                                    isDragOver && "border-l-2 border-l-primary"
                                )}
                                onClick={() => onTabSelect(tab.path)}
                            >
                                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-muted-foreground" : "text-muted-foreground/60")} />
                                <span className="truncate max-w-[120px]">{tab.name}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onTabClose(tab.path);
                                    }}
                                    className={cn(
                                        "ml-1 rounded-sm p-0.5 hover:bg-accent",
                                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                    )}
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        );
                    })}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
