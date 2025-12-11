"use client";

import * as React from "react";
import { X, Send, Bot, User, Sparkles, Copy, Check, RotateCcw, AlertCircle, RefreshCw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { publications } from "@/lib/data";

interface Message {
    role: "user" | "assistant" | "error";
    content: string;
    retryable?: boolean;
}

interface AIChatProps {
    onClose: () => void;
}

const SUGGESTED_PROMPTS = [
    "Tell me about your research",
    "What's your experience with LLMs?",
    "Show me your publications",
    "What companies have you worked at?",
];

// Max messages to keep in context (to limit costs)
const MAX_CONTEXT_MESSAGES = 10;

// Simple local response generation (no API needed for demo)
function generateResponse(userMessage: string): string {
    const msg = userMessage.toLowerCase();

    if (msg.includes("research") || msg.includes("llm") || msg.includes("nlp")) {
        return `I'm currently researching transparent reasoning with Large Language Models at the Johns Hopkins Center for Language and Speech Processing, advised by Benjamin Van Durme. My work focuses on social natural language inference (NLI) - specifically improving how LLMs interpret sarcasm, humor, and irony.

I created **SocialNLI**, the first dialogue-centric social-inference dataset with 243 Friends TV transcripts and 5.3K generated inferences. I'm also exploring reinforcement learning with process rewards to enhance LLM reasoning.`;
    }

    if (msg.includes("publication") || msg.includes("paper")) {
        return `I have ${publications.length} publications:

1. **SocialNLI: A Dialogue-Centric Social Inference Dataset** (arXiv 2025) - My main research on social reasoning in LLMs.

2. **QAagent** (AAAI 2025) - A multiagent system for unit test generation using natural language pseudocode.

3. **Surgical Robot Teleoperation** (Hamlyn 2023) - Work on mobile applications for controlling surgical robots.

Would you like more details about any of these?`;
    }

    if (msg.includes("work") || msg.includes("experience") || msg.includes("company") || msg.includes("intern")) {
        return `I've had some great industry experience:

- **Amazon Web Services** (2025) - Building browser automation systems
- **Scale AI** (2024-2025) - GenAI technical advisor, solving Olympiad-level programming problems
- **Amazon AGI** (2024) - Developed multi-agent SLM frameworks with 220% improvement over baseline
- **Quantable.io** - Founding engineer, built the full-stack platform
- **PayPal** (2023) - Optimized transaction APIs, reducing latency by ~100ms

I love working at the intersection of AI research and practical engineering!`;
    }

    if (msg.includes("about") || msg.includes("who") || msg.includes("yourself")) {
        return `Hi! I'm Akhil Deo, a CS student at Johns Hopkins University focusing on NLP, AI, and Machine Learning. I'm currently a student researcher at the JHU Center for Language and Speech Processing.

I'm passionate about making AI systems more transparent and capable of nuanced reasoning. When I'm not doing research, I enjoy building practical applications and have worked at companies like Amazon, Scale AI, and PayPal.

Feel free to ask me about my research, projects, or experience!`;
    }

    if (msg.includes("contact") || msg.includes("email") || msg.includes("reach")) {
        return `You can reach me at:
- **Email**: adeo1[at]jhu[dot]edu
- **GitHub**: github.com/akhildeo
- **LinkedIn**: linkedin.com/in/akhildeo
- **Twitter/X**: @akhil_deo1

I'm always happy to chat about research, opportunities, or just interesting AI topics!`;
    }

    if (msg.includes("achievement") || msg.includes("award")) {
        return `I've been fortunate to receive several recognitions:

★ **Pistritto Fellowship**
★ **Pava Center for Entrepreneurship Ignite Grant**
★ **JHU Whiting School of Engineering Conference Travel Grant**
★ **JHU Student Sponsorship Initiative Award**
★ **Ongoing Venture Prize & Most Creative Use of Twilio** at HopHacks Fall 2021`;
    }

    if (msg.includes("project")) {
        return `Here are my main research projects:

1. **Transparent Reasoning with LLMs** - Current research on social NLI and improving LLM reasoning about sarcasm/irony.

2. **Nuss Bar** - Medical visualization app for surgical planning using AR.

3. **SurgiSimulate** - Mobile app for controlling surgical robots, presented at Hamlyn Symposium.

Which one would you like to know more about?`;
    }

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
        return `Hey there! 👋 I'm an AI assistant for Akhil's portfolio. I can tell you about his research, work experience, publications, and projects. What would you like to know?`;
    }

    return `That's a great question! I can tell you about Akhil's:
- **Research** on LLMs and NLP
- **Work experience** at Amazon, Scale AI, PayPal, etc.
- **Publications** in AI/ML conferences
- **Projects** in medical robotics and AI
- **Achievements** and awards

What interests you most?`;
}

const INITIAL_MESSAGE: Message = {
    role: "assistant",
    content: "Hi! I'm an AI assistant for Akhil's portfolio. Ask me anything about his research, experience, or projects!",
};

export function AIChat({ onClose }: AIChatProps) {
    const [messages, setMessages] = React.useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = React.useState("");
    const [isTyping, setIsTyping] = React.useState(false);
    const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
    const [lastUserMessage, setLastUserMessage] = React.useState<string>("");
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const handleClearChat = () => {
        setMessages([INITIAL_MESSAGE]);
        setInput("");
    };

    const handleSend = async (messageToSend?: string, isRetry = false) => {
        const userMessage = (messageToSend || input).trim();
        if (!userMessage) return;

        setInput("");
        setLastUserMessage(userMessage);

        // Remove any previous error messages if retrying
        let currentMessages = messages;
        if (isRetry) {
            currentMessages = messages.filter(m => m.role !== "error");
        }

        const newMessages = [...currentMessages, { role: "user" as const, content: userMessage }];

        // Limit context to MAX_CONTEXT_MESSAGES
        const limitedMessages = newMessages.slice(-MAX_CONTEXT_MESSAGES);
        setMessages(limitedMessages);
        setIsTyping(true);

        try {
            // Try API route first (which can use Modal or fallback)
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: limitedMessages.slice(1) }), // Skip initial greeting
            });

            const data = await response.json();

            if (response.ok) {
                setMessages((prev) => {
                    const updated = [...prev, { role: "assistant" as const, content: data.message }];
                    return updated.slice(-MAX_CONTEXT_MESSAGES);
                });
            } else if (data.error) {
                // Handle specific error types from the API
                const errorMessage = data.error.message || "Something went wrong. Please try again.";
                const retryable = data.error.retryable ?? true;

                setMessages((prev) => {
                    const updated = [...prev, {
                        role: "error" as const,
                        content: errorMessage,
                        retryable
                    }];
                    return updated.slice(-MAX_CONTEXT_MESSAGES);
                });
            } else {
                // Fallback to local generation
                const localResponse = generateResponse(userMessage);
                setMessages((prev) => {
                    const updated = [...prev, { role: "assistant" as const, content: localResponse }];
                    return updated.slice(-MAX_CONTEXT_MESSAGES);
                });
            }
        } catch {
            // Network error - show error message with retry option
            setMessages((prev) => {
                const updated = [...prev, {
                    role: "error" as const,
                    content: "Unable to connect to AI service. Using offline mode.",
                    retryable: true
                }];
                return updated.slice(-MAX_CONTEXT_MESSAGES);
            });

            // Also add a local fallback response
            setTimeout(() => {
                const localResponse = generateResponse(userMessage);
                setMessages((prev) => {
                    const updated = [...prev, { role: "assistant" as const, content: localResponse }];
                    return updated.slice(-MAX_CONTEXT_MESSAGES);
                });
            }, 500);
        } finally {
            setIsTyping(false);
        }
    };

    const handleRetry = () => {
        if (lastUserMessage) {
            // Remove the last user message and error, then retry
            setMessages((prev) => prev.filter(m => m.role !== "error").slice(0, -1));
            handleSend(lastUserMessage, true);
        }
    };

    const handleCopy = (content: string, index: number) => {
        navigator.clipboard.writeText(content);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    React.useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    return (
        <div className="flex h-full flex-col bg-background border-l border-border">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-border px-3 py-2.5 bg-card/95 backdrop-blur-sm shadow-sm">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">AI Assistant</span>
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-accent text-muted-foreground hover:text-foreground"
                        onClick={handleClearChat}
                        title="New Chat"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-accent text-muted-foreground hover:text-foreground"
                        onClick={onClose}
                        title="Close"
                    >
                        <X className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            {/* Model disclaimer */}
            <div className="px-3 py-2 bg-muted/50 border-b border-border">
                <p className="text-[10px] text-muted-foreground leading-tight">
                    Powered by <span className="font-medium">Qwen3-0.6B</span>. Responses may be inaccurate - take with a grain of salt. Was just trying to test out rapid & efficient inference with serverless infrastructure and no cold starts (to save money, given the very limited scope of this).
                </p>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((message, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex gap-3",
                                message.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            {message.role === "assistant" && (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                    <Bot className="h-4 w-4 text-primary" />
                                </div>
                            )}
                            {message.role === "error" && (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                                    <AlertCircle className="h-4 w-4 text-destructive" />
                                </div>
                            )}
                            <div
                                className={cn(
                                    "group relative max-w-[85%] rounded-lg px-3 py-2 text-sm",
                                    message.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : message.role === "error"
                                            ? "bg-destructive/10 text-destructive border border-destructive/20"
                                            : "bg-muted"
                                )}
                            >
                                <div className="whitespace-pre-wrap">{message.content}</div>
                                {message.role === "error" && message.retryable && (
                                    <button
                                        onClick={handleRetry}
                                        className="mt-2 flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 transition-colors"
                                    >
                                        <RefreshCw className="h-3 w-3" />
                                        Retry
                                    </button>
                                )}
                                {message.role === "assistant" && (
                                    <button
                                        onClick={() => handleCopy(message.content, i)}
                                        className="absolute -right-8 top-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        {copiedIndex === i ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                        )}
                                    </button>
                                )}
                            </div>
                            {message.role === "user" && (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                                    <User className="h-4 w-4 text-primary-foreground" />
                                </div>
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <Bot className="h-4 w-4 text-primary" />
                            </div>
                            <div className="rounded-lg bg-muted px-3 py-2">
                                <div className="flex gap-1">
                                    <span className="animate-bounce">●</span>
                                    <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>●</span>
                                    <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Suggested prompts */}
            {messages.length <= 2 && (
                <div className="border-t border-border px-4 py-3 bg-card">
                    <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
                    <div className="flex flex-wrap gap-1.5">
                        {SUGGESTED_PROMPTS.map((prompt) => (
                            <button
                                key={prompt}
                                onClick={() => handleSend(prompt)}
                                disabled={isTyping}
                                className="text-xs bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground rounded-md px-2.5 py-1.5 transition-colors disabled:opacity-50 border border-border hover:border-primary/30"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <div className="border-t p-4">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="flex gap-2 items-end"
                >
                    <textarea
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            // Auto-resize textarea
                            e.target.style.height = "auto";
                            e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Ask me anything..."
                        className="flex-1 resize-none overflow-y-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[40px] max-h-[150px]"
                        rows={1}
                    />
                    <Button type="submit" size="icon" disabled={!input.trim() || isTyping} className="shrink-0">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
