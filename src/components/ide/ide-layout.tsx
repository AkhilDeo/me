"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { TabBar } from "./tab-bar";
import { StatusBar } from "./status-bar";
import { TitleBar } from "./title-bar";
import { Terminal } from "./terminal";
import { AIChat } from "./ai-chat";
import { CommandPalette } from "./command-palette";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AboutContent } from "@/components/content/about-content";
import { ProjectsContent, ProjectDetailContent } from "@/components/content/projects-content";
import { ExperienceContent, ExperienceDetailContent } from "@/components/content/experience-content";
import { PublicationsContent } from "@/components/content/publications-content";
import { AchievementsContent } from "@/components/content/achievements-content";

interface Tab {
    path: string;
    name: string;
    icon?: string;
}

function getTabName(path: string): string {
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 0) return "about.md";
    if (segments.length === 1) {
        return `${segments[0]}.md`;
    }
    return `${segments[segments.length - 1]}.md`;
}

function getTabIcon(path: string): string {
    if (path.includes("projects")) return "file-code";
    if (path.includes("achievements")) return "trophy";
    return "file-text";
}

const SIDEBAR_DEFAULT_SIZE = 15;
const CHAT_DEFAULT_SIZE = 30;

export function IDELayout() {
    const [activeFile, setActiveFile] = React.useState("/about");
    const [tabs, setTabs] = React.useState<Tab[]>([
        { path: "/about", name: "about.md", icon: "file-text" },
    ]);
    const [terminalOpen, setTerminalOpen] = React.useState(true);
    const [chatOpen, setChatOpen] = React.useState(false);
    const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    // Track last sizes for reopening panels at user's preferred width
    const [sidebarSize, setSidebarSize] = React.useState(SIDEBAR_DEFAULT_SIZE);
    const [chatSize, setChatSize] = React.useState(CHAT_DEFAULT_SIZE);

    const handleFileSelect = (path: string) => {
        setActiveFile(path);
        if (!tabs.find((t) => t.path === path)) {
            setTabs([...tabs, { path, name: getTabName(path), icon: getTabIcon(path) }]);
        }
    };

    const handleTabClose = (path: string) => {
        const newTabs = tabs.filter((t) => t.path !== path);
        if (newTabs.length === 0) {
            setTabs([{ path: "/about", name: "about.md", icon: "file-text" }]);
            setActiveFile("/about");
        } else if (activeFile === path) {
            setActiveFile(newTabs[newTabs.length - 1].path);
            setTabs(newTabs);
        } else {
            setTabs(newTabs);
        }
    };

    const renderContent = () => {
        if (activeFile === "/about") return <AboutContent />;
        if (activeFile === "/projects") return <ProjectsContent />;
        if (activeFile.startsWith("/projects/")) {
            const projectId = activeFile.split("/")[2];
            return <ProjectDetailContent projectId={projectId} />;
        }
        if (activeFile === "/experience") return <ExperienceContent />;
        if (activeFile.startsWith("/experience/")) {
            const expId = activeFile.split("/")[2];
            return <ExperienceDetailContent experienceId={expId} />;
        }
        if (activeFile === "/publications") return <PublicationsContent />;
        if (activeFile === "/achievements") return <AchievementsContent />;
        return <AboutContent />;
    };

    // Keyboard shortcuts
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd+K for command palette
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setCommandPaletteOpen(true);
            }
            // Ctrl+` for terminal
            if (e.ctrlKey && e.key === "`") {
                e.preventDefault();
                setTerminalOpen((prev) => !prev);
            }
            // Cmd+I for AI chat
            if ((e.metaKey || e.ctrlKey) && e.key === "i") {
                e.preventDefault();
                setChatOpen((prev) => !prev);
            }
            // Cmd+B for sidebar
            if ((e.metaKey || e.ctrlKey) && e.key === "b") {
                e.preventDefault();
                setSidebarCollapsed((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="flex h-screen flex-col bg-background">
            {/* Title Bar */}
            <TitleBar
                onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
                onToggleChat={() => setChatOpen((prev) => !prev)}
                onToggleTerminal={() => setTerminalOpen((prev) => !prev)}
                chatOpen={chatOpen}
                terminalOpen={terminalOpen}
                sidebarCollapsed={sidebarCollapsed}
            />

            {/* Command Palette */}
            <CommandPalette
                open={commandPaletteOpen}
                onOpenChange={setCommandPaletteOpen}
                onNavigate={handleFileSelect}
                onToggleTerminal={() => setTerminalOpen((prev) => !prev)}
                onToggleChat={() => setChatOpen((prev) => !prev)}
            />

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <ResizablePanelGroup direction="horizontal" id="main-layout">
                    {/* Sidebar */}
                    {!sidebarCollapsed && (
                        <>
                            <ResizablePanel
                                id="sidebar"
                                order={1}
                                defaultSize={sidebarSize}
                                minSize={10}
                                maxSize={25}
                                onResize={(size) => setSidebarSize(size)}
                            >
                                <Sidebar activeFile={activeFile} onFileSelect={handleFileSelect} />
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                        </>
                    )}

                    {/* Main Editor Area */}
                    <ResizablePanel id="editor" order={2} defaultSize={chatOpen ? 55 : 85}>
                        <ResizablePanelGroup direction="vertical" id="editor-layout">
                            {/* Editor */}
                            <ResizablePanel id="editor-content" order={1} defaultSize={terminalOpen ? 70 : 100}>
                                <div className="flex h-full flex-col">
                                    <TabBar
                                        tabs={tabs}
                                        activeTab={activeFile}
                                        onTabSelect={setActiveFile}
                                        onTabClose={handleTabClose}
                                        onTabReorder={setTabs}
                                    />
                                    <ScrollArea className="flex-1">{renderContent()}</ScrollArea>
                                </div>
                            </ResizablePanel>

                            {/* Terminal */}
                            {terminalOpen && (
                                <>
                                    <ResizableHandle withHandle />
                                    <ResizablePanel id="terminal" order={2} defaultSize={30} minSize={15} maxSize={50}>
                                        <Terminal onClose={() => setTerminalOpen(false)} />
                                    </ResizablePanel>
                                </>
                            )}
                        </ResizablePanelGroup>
                    </ResizablePanel>

                    {/* AI Chat Panel */}
                    {chatOpen && (
                        <>
                            <ResizableHandle withHandle />
                            <ResizablePanel
                                id="chat"
                                order={3}
                                defaultSize={chatSize}
                                minSize={15}
                                maxSize={40}
                                onResize={(size) => setChatSize(size)}
                            >
                                <AIChat onClose={() => setChatOpen(false)} />
                            </ResizablePanel>
                        </>
                    )}
                </ResizablePanelGroup>
            </div>

            {/* Status Bar */}
            <StatusBar
                currentFile={getTabName(activeFile)}
                onToggleTerminal={() => setTerminalOpen((prev) => !prev)}
                onToggleChat={() => setChatOpen((prev) => !prev)}
                terminalOpen={terminalOpen}
                chatOpen={chatOpen}
            />
        </div>
    );
}
