"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Minus, Square, X, Maximize2, Sun, Moon, PanelRightClose, PanelRight, Terminal, ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface TitleBarProps {
    onToggleSidebar: () => void;
    onToggleChat: () => void;
    onToggleTerminal: () => void;
    chatOpen: boolean;
    terminalOpen: boolean;
    sidebarCollapsed: boolean;
}

export function TitleBar({ onToggleSidebar, onToggleChat, onToggleTerminal, chatOpen, terminalOpen, sidebarCollapsed }: TitleBarProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [isFullscreen, setIsFullscreen] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const minimizeWindow = () => {
        // Can't actually minimize browser window, but we can show a message
        alert("Minimize is not available in browser. Use your browser's minimize button.");
    };

    const closeWindow = () => {
        if (confirm("Close this tab?")) {
            window.close();
        }
    };

    return (
        <TooltipProvider>
            <div className="flex h-[38px] items-center justify-between bg-card px-3 select-none border-b border-border">
                {/* Left side - Menu toggle */}
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={onToggleSidebar}
                                className="p-1.5 hover:bg-accent rounded transition-colors"
                            >
                                <Menu className="h-4 w-4 text-muted-foreground" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            {sidebarCollapsed ? "Show Sidebar (⌘B)" : "Hide Sidebar (⌘B)"}
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* Center - Title */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Akhil Deo — Portfolio</span>
                </div>

                {/* Right side - Controls */}
                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/"
                                className="p-1.5 px-2 hover:bg-accent rounded transition-colors flex items-center gap-1 text-muted-foreground"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span className="text-xs font-medium">Home</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Back to classic view</TooltipContent>
                    </Tooltip>

                    {/* Theme Toggle */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-1.5 hover:bg-accent rounded transition-colors"
                            >
                                {mounted && (theme === "dark" ? (
                                    <Sun className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Moon className="h-4 w-4 text-muted-foreground" />
                                ))}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            {mounted && (theme === "dark" ? "Light Mode" : "Dark Mode")}
                        </TooltipContent>
                    </Tooltip>

                    {/* Terminal Toggle */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={onToggleTerminal}
                                className={`p-1.5 rounded transition-colors ${terminalOpen ? 'bg-primary/20 text-primary' : 'hover:bg-accent text-muted-foreground'}`}
                            >
                                <Terminal className="h-4 w-4" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            {terminalOpen ? "Close Terminal (Ctrl+`)" : "Open Terminal (Ctrl+`)"}
                        </TooltipContent>
                    </Tooltip>

                    {/* AI Chat Toggle */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={onToggleChat}
                                className={`p-1.5 rounded transition-colors ${chatOpen ? 'bg-primary/20 text-primary' : 'hover:bg-accent text-muted-foreground'}`}
                            >
                                {chatOpen ? (
                                    <PanelRightClose className="h-4 w-4" />
                                ) : (
                                    <PanelRight className="h-4 w-4" />
                                )}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            {chatOpen ? "Close AI Chat (⌘I)" : "Open AI Chat (⌘I)"}
                        </TooltipContent>
                    </Tooltip>

                    <div className="w-px h-4 bg-border mx-1" />

                    {/* Window Controls */}
                    <button
                        onClick={minimizeWindow}
                        className="p-1.5 hover:bg-accent rounded transition-colors"
                    >
                        <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className="p-1.5 hover:bg-accent rounded transition-colors"
                    >
                        {isFullscreen ? (
                            <Square className="h-3.5 w-3.5 text-muted-foreground" />
                        ) : (
                            <Maximize2 className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                    </button>
                    <button
                        onClick={closeWindow}
                        className="p-1.5 hover:bg-destructive rounded transition-colors group"
                    >
                        <X className="h-3.5 w-3.5 text-muted-foreground group-hover:text-white" />
                    </button>
                </div>
            </div>
        </TooltipProvider>
    );
}
