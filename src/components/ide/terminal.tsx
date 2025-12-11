"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { personalInfo, projects, experiences, publications, achievements } from "@/lib/data";

interface TerminalProps {
    onClose: () => void;
}

interface HistoryItem {
    command: string;
    output: React.ReactNode;
}

const COMMANDS: Record<string, { description: string; handler: () => React.ReactNode }> = {
    help: {
        description: "Show available commands",
        handler: () => (
            <div className="space-y-1">
                <p className="text-primary">Available commands:</p>
                {Object.entries(COMMANDS).map(([cmd, { description }]) => (
                    <p key={cmd}>
                        <span className="text-yellow-400">{cmd.padEnd(15)}</span>
                        <span className="text-muted-foreground">{description}</span>
                    </p>
                ))}
            </div>
        ),
    },
    whoami: {
        description: "Display user information",
        handler: () => (
            <div className="space-y-1">
                <p className="text-cyan-400">{personalInfo.name}</p>
                <p className="text-muted-foreground">{personalInfo.bio}</p>
            </div>
        ),
    },
    "ls projects": {
        description: "List all projects",
        handler: () => (
            <div className="space-y-1">
                {projects.map((p) => (
                    <p key={p.id}>
                        <span className="text-blue-400">{p.id}/</span>
                        <span className="text-muted-foreground ml-4">{p.title}</span>
                    </p>
                ))}
            </div>
        ),
    },
    "ls experience": {
        description: "List work experience",
        handler: () => (
            <div className="space-y-1">
                {experiences.map((e) => (
                    <p key={e.id}>
                        <span className="text-primary">{e.organization}</span>
                        <span className="text-muted-foreground ml-2">- {e.title}</span>
                    </p>
                ))}
            </div>
        ),
    },
    publications: {
        description: "Show publications",
        handler: () => (
            <div className="space-y-2">
                {publications.map((p, i) => (
                    <p key={p.id}>
                        <span className="text-yellow-400">[{i + 1}]</span>{" "}
                        <span className="text-foreground">{p.title}</span>
                        <br />
                        <span className="text-muted-foreground text-xs ml-4">{p.authors}</span>
                    </p>
                ))}
            </div>
        ),
    },
    achievements: {
        description: "List achievements",
        handler: () => (
            <div className="space-y-1">
                {achievements.map((a, i) => (
                    <p key={i}>
                        <span className="text-yellow-400">★</span>{" "}
                        <span className="text-foreground">{a}</span>
                    </p>
                ))}
            </div>
        ),
    },
    contact: {
        description: "Show contact information",
        handler: () => (
            <div className="space-y-1">
                <p><span className="text-cyan-400">Email:</span> {personalInfo.email}</p>
                <p><span className="text-cyan-400">GitHub:</span> {personalInfo.github}</p>
                <p><span className="text-cyan-400">LinkedIn:</span> {personalInfo.linkedin}</p>
                <p><span className="text-cyan-400">Twitter:</span> {personalInfo.twitter}</p>
            </div>
        ),
    },
    clear: {
        description: "Clear terminal",
        handler: () => null,
    },
    neofetch: {
        description: "Display system info (fun)",
        handler: () => (
            <pre className="text-xs leading-tight">
                <span className="text-cyan-400">{`
       _    _    _     _ _   ____             
      / \\  | | _| |__ (_) | |  _ \\  ___  ___  
     / _ \\ | |/ / '_ \\| | | | | | |/ _ \\/ _ \\ 
    / ___ \\|   <| | | | | | | |_| |  __/ (_) |
   /_/   \\_\\_|\\_\\_| |_|_|_| |____/ \\___|\\___/ 
        `}</span>
                <span className="text-foreground">{`
   ─────────────────────────────────────────
   OS: Human v24.0 (Johns Hopkins Edition)
   Host: Baltimore, MD
   Kernel: CS + AI/ML
   Uptime: ${new Date().getFullYear() - 2002} years
   Packages: PyTorch, vLLM, LangChain, React
   Shell: zsh with oh-my-zsh
   Resolution: 1080p focus
   DE: Research + Engineering
   WM: Multi-tasking
   Terminal: This one!
   CPU: Caffeinated @ 3.2GHz
   Memory: Expanding...
        `}</span>
            </pre>
        ),
    },
};

export function Terminal({ onClose }: TerminalProps) {
    const [history, setHistory] = React.useState<HistoryItem[]>([
        {
            command: "",
            output: (
                <div>
                    <p className="text-primary">Welcome to Akhil&apos;s Terminal v1.0.0</p>
                    <p className="text-muted-foreground">Type &apos;help&apos; to see available commands.</p>
                </div>
            ),
        },
    ]);
    const [input, setInput] = React.useState("");
    const [commandHistory, setCommandHistory] = React.useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = React.useState(-1);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        if (trimmedCmd === "clear") {
            setHistory([]);
            return;
        }

        const command = COMMANDS[trimmedCmd];
        const output = command
            ? command.handler()
            : (
                <p className="text-destructive">
                    zsh: command not found: {cmd}
                </p>
            );

        setHistory((prev) => [...prev, { command: cmd, output }]);
        setCommandHistory((prev) => [...prev, cmd]);
        setHistoryIndex(-1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            handleCommand(input);
            setInput("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
            } else {
                setHistoryIndex(-1);
                setInput("");
            }
        }
    };

    React.useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [history, input]);

    React.useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className="flex h-full flex-col bg-background text-sm font-mono" onClick={handleTerminalClick}>
            {/* Mac-style terminal header */}
            <div className="flex items-center justify-between bg-secondary px-3 py-2 border-b border-border">
                <div className="flex items-center gap-2">
                    {/* Traffic light buttons */}
                    <button
                        onClick={onClose}
                        className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors"
                        title="Close"
                    />
                    <button
                        onClick={onClose}
                        className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/80 transition-colors"
                        title="Minimize"
                    />
                    <button
                        className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 transition-colors"
                        title="Maximize"
                    />
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <span className="text-xs text-muted-foreground font-medium">akhil@portfolio — zsh</span>
                </div>
                <div className="w-16" /> {/* Spacer for balance */}
            </div>

            <ScrollArea className="flex-1 p-3 h-0">
                <div className="space-y-1 min-h-full">
                    {history.map((item, i) => (
                        <div key={i}>
                            {item.command && (
                                <div className="flex items-center gap-1">
                                    <span className="text-primary font-bold">➜</span>
                                    <span className="text-blue-500 font-bold">~</span>
                                    <span className="text-foreground ml-1">{item.command}</span>
                                </div>
                            )}
                            {item.output && <div className="mt-1 text-muted-foreground">{item.output}</div>}
                        </div>
                    ))}
                    {/* Input line inline with history - modern terminal style */}
                    <form onSubmit={handleSubmit} className="flex items-center gap-1">
                        <span className="text-primary font-bold">➜</span>
                        <span className="text-blue-500 font-bold">~</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent outline-none text-foreground ml-1 caret-primary"
                            placeholder=""
                            autoFocus
                            spellCheck={false}
                        />
                        <span className="w-2 h-4 bg-primary animate-pulse" /> {/* Cursor */}
                    </form>
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>
        </div>
    );
}
