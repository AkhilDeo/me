"use client";

import * as React from "react";
import { GitBranch, Circle, Terminal, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface StatusBarProps {
    currentFile: string;
    onToggleTerminal: () => void;
    onToggleChat: () => void;
    terminalOpen: boolean;
    chatOpen: boolean;
}

export function StatusBar({
    currentFile,
    onToggleTerminal,
    onToggleChat,
    terminalOpen,
    chatOpen
}: StatusBarProps) {
    return (
        <TooltipProvider>
            <div className="flex h-[22px] items-center justify-between bg-[#007ACC] px-2 text-white text-xs border-t border-border">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <GitBranch className="h-3.5 w-3.5" />
                        <span>main</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Circle className="h-2 w-2 fill-green-400 text-green-400" />
                        <span>Ready</span>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <span className="opacity-80">{currentFile || "No file open"}</span>
                </div>

                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-5 px-1.5 hover:bg-accent hover:text-foreground ${terminalOpen ? 'bg-primary/20 text-white' : 'text-white'}`}
                                onClick={onToggleTerminal}
                            >
                                <Terminal className="h-3.5 w-3.5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Toggle Terminal (Ctrl+`)</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-5 px-1.5 hover:bg-accent hover:text-foreground ${chatOpen ? 'bg-primary/20 text-white' : 'text-white'}`}
                                onClick={onToggleChat}
                            >
                                <MessageSquare className="h-3.5 w-3.5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Toggle AI Chat (⌘I)</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    );
}
