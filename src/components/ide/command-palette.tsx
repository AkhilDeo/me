"use client";

import * as React from "react";
import {
    FileText,
    Briefcase,
    BookOpen,
    Trophy,
    User,
    Sun,
    Moon,
    Terminal,
    MessageSquare,
} from "lucide-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { useTheme } from "next-themes";

interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onNavigate: (path: string) => void;
    onToggleTerminal: () => void;
    onToggleChat: () => void;
}

export function CommandPalette({
    open,
    onOpenChange,
    onNavigate,
    onToggleTerminal,
    onToggleChat,
}: CommandPaletteProps) {
    const { setTheme } = useTheme();

    const runCommand = React.useCallback(
        (command: () => void) => {
            onOpenChange(false);
            command();
        },
        [onOpenChange]
    );

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                    <CommandItem onSelect={() => runCommand(() => onNavigate("/about"))}>
                        <User className="mr-2 h-4 w-4" />
                        <span>About</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => onNavigate("/projects"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Projects</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => onNavigate("/experience"))}>
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>Experience</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => onNavigate("/publications"))}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>Publications</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => onNavigate("/achievements"))}>
                        <Trophy className="mr-2 h-4 w-4" />
                        <span>Achievements</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Panels">
                    <CommandItem onSelect={() => runCommand(onToggleTerminal)}>
                        <Terminal className="mr-2 h-4 w-4" />
                        <span>Toggle Terminal</span>
                        <CommandShortcut>⌃`</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(onToggleChat)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Toggle AI Chat</span>
                        <CommandShortcut>⌘I</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Theme">
                    <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light Mode</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark Mode</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
