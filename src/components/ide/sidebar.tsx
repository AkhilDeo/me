"use client";

import * as React from "react";
import { ChevronRight, ChevronDown, FileText, FileCode, Folder, FolderOpen, Trophy, User, Briefcase, BookOpen, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fileTree } from "@/lib/data";

interface FileTreeItem {
    name: string;
    type: "file" | "folder";
    icon: string;
    path: string;
    children?: FileTreeItem[];
}

interface SidebarProps {
    activeFile: string;
    onFileSelect: (path: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
    "file-text": FileText,
    "file-code": FileCode,
    folder: Folder,
    "folder-open": FolderOpen,
    trophy: Trophy,
    user: User,
    briefcase: Briefcase,
    "book-open": BookOpen,
    award: Award,
};

function FileTreeNode({
    item,
    depth = 0,
    activeFile,
    onFileSelect,
}: {
    item: FileTreeItem;
    depth?: number;
    activeFile: string;
    onFileSelect: (path: string) => void;
}) {
    const [isOpen, setIsOpen] = React.useState(true);
    const Icon = iconMap[item.icon] || FileText;
    const isActive = activeFile === item.path;
    const isFolder = item.type === "folder";

    return (
        <div>
            <button
                onClick={() => {
                    if (isFolder) {
                        setIsOpen(!isOpen);
                    } else {
                        onFileSelect(item.path);
                    }
                }}
                className={cn(
                    "flex w-full items-center gap-1 px-2 py-1 text-[13px] hover:bg-accent transition-colors",
                    isActive && "bg-primary/10 text-primary",
                    !isActive && "text-muted-foreground",
                    "text-left"
                )}
                style={{ paddingLeft: `${depth * 12 + 8}px` }}
            >
                {isFolder ? (
                    isOpen ? (
                        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )
                ) : (
                    <span className="w-4" />
                )}
                {isFolder ? (
                    isOpen ? (
                        <FolderOpen className="h-4 w-4 shrink-0 text-amber-500" />
                    ) : (
                        <Folder className="h-4 w-4 shrink-0 text-amber-500" />
                    )
                ) : (
                    <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                )}
                <span className="truncate">{item.name}</span>
            </button>
            {isFolder && isOpen && item.children && (
                <div>
                    {item.children.map((child) => (
                        <FileTreeNode
                            key={child.path}
                            item={child}
                            depth={depth + 1}
                            activeFile={activeFile}
                            onFileSelect={onFileSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export function Sidebar({ activeFile, onFileSelect }: SidebarProps) {
    return (
        <div className="flex h-full flex-col border-r border-border bg-sidebar">
            <div className="flex items-center gap-2 px-4 py-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Explorer
                </span>
            </div>
            <ScrollArea className="flex-1">
                <div className="px-1">
                    <div className="flex items-center gap-1 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground bg-muted hover:bg-accent cursor-pointer">
                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                        <span>akhil-deo</span>
                    </div>
                    {fileTree.map((item) => (
                        <FileTreeNode
                            key={item.path}
                            item={item}
                            activeFile={activeFile}
                            onFileSelect={onFileSelect}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
