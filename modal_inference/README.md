# Modal Serverless LLM Inference

This directory contains the Modal deployment for the portfolio chatbot's AI backend using **Qwen3-0.6B**.

## Quick Start

```bash
# 1. Install Modal CLI
pip install modal

# 2. Authenticate (one-time setup - you've already done this!)
modal setup
# Token is connected to the singingbird99 workspace

# 3. Deploy (creates a serverless function - pay per invocation)
cd modal_inference
modal deploy app.py
```

After deployment, Modal outputs your endpoint URL:
```
✓ Created web function chat => https://singingbird99--portfolio-chatbot-chat.modal.run
```

## Configure Your Next.js App

Create `.env.local` in the project root:
```
MODAL_ENDPOINT=https://singingbird99--portfolio-chatbot-chat.modal.run
```

That's it! The chatbot will now use your Modal endpoint.

## Serverless = Pay Per Invocation

This is a **true serverless function** - you only pay when it's called:
- No permanent deployment costs
- Scales to zero when not in use ($0 when idle)
- Spins up GPU containers on-demand
- Keeps containers warm for 30s after requests (reduces cold starts)

## Cost Estimate

- **T4 GPU**: ~$0.59/hour (billed per second)
- **Per request**: ~$0.001-0.003 (1-5 seconds of compute)
- **Typical portfolio traffic**: $0.50-2/month
- **No traffic**: $0 (scales to zero)

Modal gives you **$30 free credits** to start!

## Model Choice

Using `Qwen/Qwen3-0.6B`:
- 0.6B parameters - very fast inference
- Good instruction following
- Max 200 tokens per response (cost control)

## Safety Guardrails

The app includes RAI (Responsible AI) safety features:
- **Input filtering**: Blocks prompt injection, harmful requests, off-topic abuse
- **Output filtering**: Sanitizes potentially harmful model outputs
- **Topic restriction**: Only answers questions about Akhil's portfolio/work

## Testing Locally

```bash
# Test safety checks without GPU
python app.py

# Hot reload for development (uses GPU)
modal serve app.py
```

Test with curl:
```bash
curl -X POST https://singingbird99--portfolio-chatbot-chat.modal.run \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Tell me about your research"}]}'
```

## Error Handling

The endpoint returns structured errors:
```json
{
  "response": "Error message to display",
  "blocked": true,  // If blocked by safety filters
  "error": "..."    // If there was a processing error
}
```

The Next.js frontend handles these gracefully with retry options.
