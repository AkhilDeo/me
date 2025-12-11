import { NextRequest, NextResponse } from "next/server";

// Error types for better error handling
type ChatError = {
    type: "MODAL_UNAVAILABLE" | "MODAL_ERROR" | "RATE_LIMIT" | "UNKNOWN";
    message: string;
    retryable: boolean;
};

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();

        // Check if Modal endpoint is configured
        const modalEndpoint = process.env.MODAL_ENDPOINT;

        if (modalEndpoint) {
            try {
                // Use Modal serverless inference (pay per invocation)
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

                const response = await fetch(modalEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        messages: messages.slice(-6), // Limit context to last 6 messages
                        max_tokens: 200,
                        temperature: 0.7,
                    }),
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    // Check for specific error codes
                    if (response.status === 429) {
                        // Rate limited or out of credits
                        return NextResponse.json(
                            {
                                error: {
                                    type: "RATE_LIMIT",
                                    message: "AI service is temporarily unavailable. Please try again later.",
                                    retryable: true,
                                } as ChatError,
                            },
                            { status: 429 }
                        );
                    }
                    if (response.status === 503 || response.status === 502) {
                        // Service unavailable (cold start or overloaded)
                        return NextResponse.json(
                            {
                                error: {
                                    type: "MODAL_UNAVAILABLE",
                                    message: "AI is warming up. Please try again in a few seconds.",
                                    retryable: true,
                                } as ChatError,
                            },
                            { status: 503 }
                        );
                    }
                    throw new Error(`Modal API returned ${response.status}`);
                }

                // Modal returns SSE streaming format: "data: {...}\n\n"
                // Parse the streaming response and collect all chunks
                const text = await response.text();
                const lines = text.split("\n");
                let fullResponse = "";
                let blocked = false;
                let errorMsg = "";

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        const jsonStr = line.slice(6); // Remove "data: " prefix
                        if (jsonStr === "[DONE]") continue;

                        try {
                            const data = JSON.parse(jsonStr);
                            if (data.chunk) {
                                fullResponse += data.chunk;
                            }
                            if (data.response) {
                                fullResponse = data.response;
                            }
                            if (data.blocked) {
                                blocked = true;
                            }
                            if (data.error) {
                                errorMsg = data.error;
                            }
                        } catch {
                            // Skip malformed JSON lines
                        }
                    }
                }

                if (blocked) {
                    return NextResponse.json({
                        message: fullResponse,
                        blocked: true,
                    });
                }

                if (errorMsg && !fullResponse) {
                    console.error("Modal error:", errorMsg);
                    throw new Error(errorMsg);
                }

                return NextResponse.json({ message: fullResponse.trim() });
            } catch (fetchError) {
                // Handle fetch-specific errors
                if (fetchError instanceof Error) {
                    if (fetchError.name === "AbortError") {
                        return NextResponse.json(
                            {
                                error: {
                                    type: "MODAL_UNAVAILABLE",
                                    message: "Request timed out. The AI might be warming up. Please try again.",
                                    retryable: true,
                                } as ChatError,
                            },
                            { status: 504 }
                        );
                    }
                    console.error("Modal fetch error:", fetchError.message);
                }
                // Fall through to local response
            }
        }

        // Fallback: Use local response generation
        const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
        const response = generateLocalResponse(lastMessage);

        return NextResponse.json({ message: response, fallback: true });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            {
                error: {
                    type: "UNKNOWN",
                    message: "Something went wrong. Please try again.",
                    retryable: true,
                } as ChatError,
            },
            { status: 500 }
        );
    }
}

function generateLocalResponse(msg: string): string {
    if (msg.includes("research") || msg.includes("llm") || msg.includes("nlp")) {
        return `I'm currently researching transparent reasoning with Large Language Models at the Johns Hopkins Center for Language and Speech Processing, advised by Benjamin Van Durme. My work focuses on social natural language inference (NLI) - specifically improving how LLMs interpret sarcasm, humor, and irony.

I created **SocialNLI**, the first dialogue-centric social-inference dataset comprising 243 Friends TV transcripts, 5.3K generated inferences, and a 1.4K human-annotated evaluation split. I've also developed an efficient counterfactual-reasoning pipeline using PyTorch, vLLM, and Langchain to assign calibrated plausibility scores to social inferences.

I'm passionate about making AI systems more transparent and am currently exploring reinforcement learning with process and rubric-based rewards to enhance reasoning processes in LLMs. My broader research interests include multi-agent systems, chain-of-thought reasoning, and transparent AI architectures.`;
    }

    if (msg.includes("publication") || msg.includes("paper")) {
        return `I have 3 publications:

1. **SocialNLI: A Dialogue-Centric Social Inference Dataset** (arXiv 2025) - My main research on social reasoning in LLMs.

2. **QAagent** (AAAI 2025) - A multiagent system for unit test generation using natural language pseudocode.

3. **Surgical Robot Teleoperation** (Hamlyn 2023) - Work on mobile applications for controlling surgical robots.

Would you like more details about any of these?`;
    }

    if (msg.includes("work") || msg.includes("experience") || msg.includes("company") || msg.includes("intern")) {
        return `I've had some incredible industry experience that bridges AI research and practical engineering:

- **Amazon Web Services** (2025) - Software Development Engineering Intern designing and building a recording system that captures user interactions in browsers and automatically generates reproducible workflows, improving automation accuracy by 20% and eliminating manual workflow design.

- **Scale AI** (2024-2025) - Technical Advisor Intern for GenAI, solving Olympiad-level competitive programming problems that only ~10% of competitive programmers can solve, and crafting specialized prompts to enable LLMs to tackle these challenging problems for code-reasoning model training.

- **Amazon AGI** (2024) - SDE Intern where I devised and developed multi-agent Small Language Model frameworks using Amazon Nova and Anthropic Claude, achieving a ~220% increase over baseline on the TravelPlanner dataset, plus implemented an evaluation pipeline with RxJava and Python that sped up evaluations by 400%.

- **Quantable.io** - Founding Engineer where I constructed PostgreSQL database schemas, built efficient Node.js APIs, developed a custom LaTeX rendering library, created admin tools, and implemented a production-ready RBAC system to serve 1,200+ quantitative finance problems for 2,500+ users.

- **PayPal** (2023) - Software Engineering Intern where I redesigned the monetary transactions API with an eventually consistent data strategy, caching transactions locally to eliminate multiple mid-tier API calls, improving performance by ~100ms per call for tens of thousands of daily Buy Now Pay Later transactions.

I love working at the intersection of AI research and practical engineering - each role has taught me something different about building scalable, intelligent systems!`;
    }

    if (msg.includes("about") || msg.includes("who") || msg.includes("yourself")) {
        return `Hi! I'm Akhil Deo, a CS student at Johns Hopkins University focusing on NLP, AI, and Machine Learning. I'm currently a student researcher at the JHU Center for Language and Speech Processing, working under Benjamin Van Durme.

I'm passionate about making AI systems more transparent and capable of nuanced reasoning, particularly in understanding social context like sarcasm, humor, and irony. My main research contribution is SocialNLI - the first dialogue-centric social-inference dataset that helps LLMs better understand social dynamics in conversation.

I love working at the intersection of AI research and practical engineering. I've had the opportunity to work at Amazon (both AWS and AGI teams), Scale AI, PayPal, and was a founding engineer at Quantable.io. Each experience has taught me something different about building scalable, intelligent systems.

My research interests span LLM reasoning, multi-agent systems, reinforcement learning for LLMs, and transparent AI architectures. I'm also passionate about medical robotics - I've worked on projects involving surgical robot teleoperation and AR visualization for medical procedures.

Feel free to ask me about my research, projects, publications, or any of my experiences!`;
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
        return `Here are my main research and technical projects:

1. **Transparent Reasoning with LLMs** (Current) - My primary research at JHU CLSP on social natural language inference. I created SocialNLI, the first dialogue-centric social-inference dataset with 243 Friends TV transcripts and 5.3K generated inferences. I'm also exploring reinforcement learning with process rewards to enhance LLM reasoning and developing counterfactual reasoning pipelines.

2. **Nuss Bar** (Feb-July 2024) - Medical visualization desktop app at JHU Laboratory for Computational Sensing and Robotics to aid clinicians in shaping bars for the Nuss Procedure (used to correct Pectus Excavatum). I'm also conceiving a user study comparing efficacy of AR-shown prototypes vs. 3D printed bars.

3. **SurgiSimulate** (Feb 2022-July 2023) - Mobile application using Swift and Objective-C to control a da Vinci Research Kit (dVRK). I leveraged ARKit for device transformation capture and ROS/Python for robot control. Designed and ran a 16-participant user study and presented at the Hamlyn Symposium on Medical Robotics.

4. **Multi-Agent SLM Frameworks** - My Amazon AGI internship project developing frameworks using Amazon Nova and Anthropic Claude with 220% improvement over baseline.

5. **Quantable.io Platform** - As founding engineer, built the full-stack quantitative finance platform serving 2,500+ users with PostgreSQL, Node.js, and custom LaTeX rendering.

Which project interests you most?`;
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
