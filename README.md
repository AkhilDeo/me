# Akhil Deo - IDE-Style Portfolio

A modern, interactive portfolio website styled like VS Code/Cursor IDE, featuring an AI chatbot assistant, interactive terminal, and full dark/light mode support.

![Portfolio Preview](preview.png)

## ✨ Features

- **IDE-Style Interface** - Full VS Code/Cursor-inspired layout with:
  - File explorer sidebar
  - Tabbed content panels
  - Resizable panels
  - Status bar with git info

- **AI Chat Assistant** - Right-panel chatbot that answers questions about me
  - Supports Modal serverless inference (optional)
  - Falls back to smart local responses

- **Interactive Terminal** - Type commands like `whoami`, `ls projects`, `neofetch`

- **Command Palette** - Press `Cmd+K` for quick navigation

- **Dark/Light Mode** - Toggle via status bar or command palette

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+K` | Open command palette |
| `Cmd+B` | Toggle sidebar |
| `Cmd+I` | Toggle AI chat panel |
| `Ctrl+\`` | Toggle terminal |

## 🤖 AI Chatbot Setup (Optional)

The chatbot works out of the box with smart local responses. For real LLM inference:

1. Install Modal: `pip install modal && modal setup`
2. Deploy: `cd modal_inference && modal deploy app.py`
3. Add to `.env.local`: `MODAL_ENDPOINT=https://your-url.modal.run`

See [modal_inference/README.md](modal_inference/README.md) for details.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Components**: Radix UI primitives
- **Icons**: Lucide React
- **Theming**: next-themes
- **AI**: Modal serverless (optional)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/chat/      # AI chat API route
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout with providers
│   └── page.tsx       # Main page
├── components/
│   ├── content/       # Content panels (About, Projects, etc.)
│   ├── ide/           # IDE components (Sidebar, Tabs, Terminal, etc.)
│   ├── providers/     # Theme provider
│   └── ui/            # shadcn/ui components
└── lib/
    ├── data.ts        # Portfolio content data
    └── utils.ts       # Utility functions
```

## 🚢 Deployment

Deploy easily on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/akhildeo/personal-website-v2)

Or build for production:

```bash
npm run build
npm start
```

## 📝 Customization

1. **Update content**: Edit `src/lib/data.ts` with your info
2. **Change theme colors**: Modify CSS variables in `src/app/globals.css`
3. **Add sections**: Create new content components in `src/components/content/`

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!
