<div align="center">

<br/>

```
███████╗██╗████████╗███████╗██████╗ ██╗     ██╗   ██╗███████╗██████╗ ██████╗ ██╗███╗   ██╗████████╗
██╔════╝██║╚══██╔══╝██╔════╝██╔══██╗██║     ██║   ██║██╔════╝██╔══██╗██╔══██╗██║████╗  ██║╚══██╔══╝
███████╗██║   ██║   █████╗  ██████╔╝██║     ██║   ██║█████╗  ██████╔╝██████╔╝██║██╔██╗ ██║   ██║   
10: ███████║██║   ██║   ███████╗██████╔╝███████╗╚██████╔╝███████╗██║     ██║  ██║██║██║ ╚████║   ██║   
11: ╚══════╝╚═╝   ╚═╝   ╚══════╝╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝   ╚═╝  
                                                                                    AI  •  v1.0.0
```

<br/>

### 🔍 Analyze any website. Generate a perfect clone prompt. Build it instantly.

<br/>

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chrome.google.com/webstore)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/)
[![Groq API](https://img.shields.io/badge/Powered%20by-Groq%20AI-orange?style=for-the-badge&logo=lightning&logoColor=white)](https://groq.com)
[![Llama 3.3](https://img.shields.io/badge/Model-Llama%203.3%2070B-purple?style=for-the-badge&logo=meta&logoColor=white)](https://groq.com)
[![License MIT](https://img.shields.io/badge/License-MIT-red?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

<br/>

> **Visit any website → Click the extension → Get a production-ready AI prompt to rebuild it from scratch.**  
> Colors. Fonts. Layout. Components. Tech stack. Roadmap. All in one panel.

<br/>

---

</div>

<br/>

## 📸 Preview

<div align="center">

```
┌─────────────────────────────────────────┐
│  🔷 SiteBlueprint AI          [↺ Refresh]│
│  ─────────────────────────────────────  │
│  Analyzing: adidas.com                  │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │     ✨ Analyze This Site        │    │
│  └─────────────────────────────────┘    │
│                                         │
│  📊 SITE SUMMARY                        │
│  ├ Type        E-Commerce               │
│  ├ Style       Bold & Minimal           │
│  ├ Complexity  Complex                  │
│  └ Build Time  5–7 days                 │
│                                         │
│  📋 CLONE PROMPT              [📋 Copy] │
│  ┌─────────────────────────────────┐    │
│  │ Build a website that looks      │    │
│  │ exactly like Adidas.com. It     │    │
│  │ should have a sticky dark       │    │
│  │ navbar, full-width hero with... │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ⚙️  TECH STACK                         │
│  ├ Frontend    Next.js 14               │
│  ├ Styling     Tailwind CSS             │
│  ├ Animations  Framer Motion            │
│  └ Hosting     Vercel                   │
│                                         │
│  🗺️  BUILD ROADMAP                      │
│  ● 1  Project setup           30 mins   │
│  ● 2  Navbar + Hero           2 hours   │
│  ● 3  Product grid            3 hours   │
│  ● 4  Animations + polish     2 hours   │
│                                         │
│  🎨 COLOR PALETTE                       │
│  ●#000  ●#FFF  ●#FF6B35  ●#1A1A1A      │
└─────────────────────────────────────────┘
```

</div>

<br/>

---

<br/>

## ✨ Features

<br/>

```
╔══════════════════════════════════════════════════════════════════════╗
║                        CORE CAPABILITIES                             ║
101: ╠══════════════╦═══════════════════════════════════════════════════════╣
102: ║  🔍 Analyze  ║  Deep DOM scan — layout, colors, fonts, components   ║
103: ║  🤖 Generate ║  AI-powered clone prompt (300–400 words, production) ║
104: ║  ⚙️  Stack   ║  Exact tech stack recommendation for that site       ║
105: ║  🗺️  Roadmap ║  Step-by-step build guide with time estimates        ║
106: ║  🎨 Palette  ║  Visual color swatches with hex codes                ║
107: ║  📋 Copy     ║  One-click copy — paste straight into any AI tool    ║
108: ║  ⚡ Speed    ║  Full analysis in under 5 seconds (Groq is fast)     ║
109: ║  🌐 Universal║  Works on every website — no restrictions            ║
110: ╚══════════════╩═══════════════════════════════════════════════════════╝
```

<br/>

---

<br/>

## 🧠 How It Works

<br/>

### Full System Architecture

```
                        ┌─────────────────────────────────────┐
                        │           USER'S BROWSER            │
                        │                                     │
  ┌──────────┐          │  ┌─────────────┐                   │
  │ Any Site │          │  │  Extension  │                   │
  │          │          │  │    Icon     │                   │
  │ adidas   │          │  └──────┬──────┘                   │
  │ apple    │          │         │ click                    │
  │ vercel   │          │         ▼                          │
  │ notion   │          │  ┌─────────────────────────────┐  │
  │  ...     │          │  │      background.js           │  │
  └────┬─────┘          │  │   (Service Worker MV3)       │  │
       │                │  │                             │  │
       │ inject         │  │  ● Opens Side Panel         │  │
       ▼                │  │  ● Routes messages          │  │
  ┌─────────────┐       │  │  ● Calls Groq API           │  │
  │ content.js  │◄──────┼──│  ● Stores API key           │  │
  │             │       │  └──────────┬────────────────┘  │
  │ Reads:      │       │             │                    │
  │ • DOM tree  │       │             │ extracted data     │
  │ • CSS vars  │       │             ▼                    │
  │ • Fonts     │──────►│  ┌─────────────────────────────┐ │
  │ • Colors    │       │  │       Groq API               │ │
  │ • Layout    │       │  │   llama-3.3-70b-versatile    │ │
  │ • Comps     │       │  │                             │ │
  └─────────────┘       │  │  System prompt + page data  │ │
                        │  │  → JSON response            │ │
                        │  └──────────┬────────────────┘ │
                        │             │                    │
                        │             ▼                    │
                        │  ┌─────────────────────────────┐ │
                        │  │       sidepanel/             │ │
                        │  │  panel.html + panel.js       │ │
                        │  │                             │ │
                        │  │  Renders:                   │ │
                        │  │  ✓ Site Summary             │ │
                        │  │  ✓ Clone Prompt             │ │
                        │  │  ✓ Tech Stack               │ │
                        │  │  ✓ Build Roadmap            │ │
                        │  │  ✓ Color Palette            │ │
                        │  └─────────────────────────────┘ │
                        └─────────────────────────────────────┘
```

<br/>

### Data Extraction Pipeline

```
  WEBSITE DOM
      │
      ▼
  ┌─────────────────────────────────────────────────────────┐
  │                   content.js                             │
  │                                                         │
  │  ┌───────────┐  ┌───────────┐  ┌───────────┐           │
  │  │  Layout   │  │  Visual   │  │Components │           │
  │  │ Detection │  │ Extraction│  │ Detection │           │
  │  │           │  │           │  │           │           │
  │  │ • Flexbox │  │ • Top 6   │  │ • Navbar  │           │
  │  │ • Grid    │  │   colors  │  │ • Hero    │           │
  │  │ • Float   │  │ • Fonts   │  │ • Cards   │           │
  │  │ • Mixed   │  │ • Spacing │  │ • Forms   │           │
  │  │ • Sections│  │ • Borders │  │ • Modals  │           │
  │  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘           │
  │        │              │              │                  │
  │        └──────────────┼──────────────┘                  │
  │                       ▼                                 │
  │  ┌───────────┐  ┌───────────┐  ┌───────────┐           │
  │  │  Content  │  │   Tech    │  │  Meta     │           │
  │  │  Scraping │  │ Detection │  │  Parsing  │           │
  │  │           │  │           │  │           │           │
  │  │ • Headings│  │ • React   │  │ • Title   │           │
  │  │ • Nav     │  │ • Vue     │  │ • Desc    │           │
  │  │ • CTAs    │  │ • Next.js │  │ • OG tags │           │
  │  │ • Buttons │  │ • Tailwind│  │ • Viewport│           │
  │  │ • Images  │  │ • Bootstrap  │ • Schema  │           │
  │  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘           │
  │        └──────────────┼──────────────┘                  │
  │                       ▼                                 │
  │              { extractedData }                          │
  └─────────────────────────┬───────────────────────────────┘
                             │
                             ▼
                       background.js
                       Groq API Call
                             │
                             ▼
                    ┌────────────────┐
                    │  JSON Response │
                    │                │
                    │ • summary      │
                    │ • clonePrompt  │
                    │ • techStack    │
                    │ • roadmap[]    │
                    │ • colorPalette │
                    │ • fonts[]      │
                    └────────┬───────┘
                             │
                             ▼
                       Side Panel UI
```

<br/>

### Message Flow (Extension Communication)

```
  panel.js                background.js              content.js
     │                         │                         │
     │──── GET_PAGE_DATA ──────►│                         │
     │                         │──executeScript()────────►│
     │                         │                         │ extract DOM
     │                         │◄── extractedData ───────│
     │                         │                         │
     │                         │──── Groq API call ──────►[groq.com]
     │                         │◄─── JSON response ──────[groq.com]
     │                         │                         │
     │◄──── RENDER_RESULT ─────│                         │
     │                         │                         │
  renders                      │                         │
  all sections                 │                         │
```

<br/>

---

<br/>

## 🗂️ Project Structure

```
siteblueprint-ai/
│
├── 📄 manifest.json              ← Extension config (MV3)
│                                    permissions, side panel, content scripts
│
├── 📄 background.js              ← Service worker
│                                    API calls, message routing, key storage
│
├── 📄 content.js                 ← Injected on every page
│                                    DOM extraction (no network calls)
│
├── 📁 sidepanel/
│   ├── 📄 panel.html             ← Side panel structure
│   ├── 📄 panel.css              ← Dark theme UI styles
│   └── 📄 panel.js               ← Panel logic + rendering
│
└── 📁 icons/
    ├── 🖼️ icon16.png
    ├── 🖼️ icon48.png
    └── 🖼️ icon128.png
```

<br/>

---

<br/>

## 🚀 Getting Started

<br/>

### Prerequisites

```bash
# You need:
✓ Google Chrome 114+  (Side Panel API support)
✓ A free Groq API key  →  https://console.groq.com
✓ That's it. No Node.js, no build step.
```

<br/>

### Installation

```bash
# Step 1 — Clone the repo
git clone https://github.com/codest0411/SiteClone-AI.git
cd SiteClone-AI

# Step 2 — Add your Groq API key
# Create config.js and add your key:
echo "const SITECLONE_CONFIG = { GROQ_API_KEY: 'your_key' };" > config.js

# Step 3 — Load in Chrome
# → Go to chrome://extensions
# → Enable "Developer Mode" (top right toggle)
# → Click "Load unpacked"
# → Select the SiteClone-AI folder

# Step 4 — Use it!
# → Visit any website (e.g. adidas.com)
# → Click the SiteClone-AI icon in toolbar
# → Click "Analyze This Site"
# → Copy your prompt and paste into Claude / ChatGPT
```

<br/>

---

<br/>

## 🧩 What Gets Extracted

<br/>

```
  CATEGORY          WHAT WE READ                    HOW
  ─────────────────────────────────────────────────────────────
  Layout          flexbox / grid / float type     getComputedStyle()
                  number of sections              querySelectorAll()
                  sticky / fixed elements         position checks

  Colors          top 6 background colors         getComputedStyle() scan
                  text colors                     entire DOM walk
                  border / accent colors          frequency ranking

  Typography      font families used              computed font-family
                  font sizes                      h1–h6 detection
                  font weights                    style parsing

  Components      navbar, hero, footer            semantic + role detection
                  cards, carousels, modals        class name pattern matching
                  forms, tables, CTAs             element type scanning
                  image galleries, pricing        content analysis

  Tech Hints      React / Next.js / Vue           window.__NEXT_DATA__, __vue__
                  Tailwind / Bootstrap            class name sampling
                  Angular                         ng-version attr check

  Meta            title, description              document.title, meta tags
                  OG tags                         property="og:*"
                  viewport config                 responsive check
  ─────────────────────────────────────────────────────────────
```

<br/>

---

<br/>

## 📦 Tech Stack

<br/>

```
  LAYER                   TECHNOLOGY               WHY
  ──────────────────────────────────────────────────────────────
  Extension Platform    Chrome MV3               Latest standard, secure
  Side Panel            Chrome sidePanel API     Native, no popup flicker
  Content Extraction    Vanilla JS               No deps, runs anywhere
  AI Model              Groq / Llama 3.3 70B     Fastest inference available
  API Communication     fetch() in SW            Clean, Promise-based
  Styling               CSS Variables            Dark theme, no framework
  Storage               chrome.storage.local     Persist key, no backend
  ──────────────────────────────────────────────────────────────
```

<br/>

---

<br/>

## 🔐 Privacy & Security

```
  ✅  All DOM reading happens locally in your browser
  ✅  Zero data sent to any third party except Groq (the AI)
  ✅  Groq only receives anonymized extracted data (no raw HTML)
  ✅  API key stored locally in chrome.storage — never leaves your device
  ✅  No tracking, no analytics, no accounts required
  ✅  Content script is READ-ONLY — never modifies the host page
```

<br/>

---

<br/>

## 🤝 Compatible With

```
  ✓ E-Commerce      adidas, amazon, shopify stores, WooCommerce sites
  ✓ SaaS Landing    notion, linear, vercel, stripe, figma.com
  ✓ Portfolios      personal sites, agency sites, design portfolios
  ✓ Blogs           medium, substack, news sites, editorial sites
  ✓ Dashboards      admin panels, analytics UIs, internal tools
  ✓ Social          twitter/X, reddit, linkedin (public pages)

  ⚠  May have limited data on:
     Google, Facebook (partial DOM access due to CSP)
     Sites with heavy SSR that render after page load
     Login-gated pages (only sees the login page)
```

<br/>

---

<br/>

## 🗺️ Roadmap

```
  VERSION    FEATURE                                  STATUS
  ───────────────────────────────────────────────────────────
  v1.0       Core extraction + Groq integration        ✅ Done
  v1.0       Side panel UI with dark theme             ✅ Done
  v1.0       Clone prompt + tech stack + roadmap       ✅ Done
  v1.0       Color palette swatches                    ✅ Done
  ───────────────────────────────────────────────────────────
  v1.1       Save & compare multiple sites             🔨 Building
  v1.1       Export prompt as .txt / .md file          🔨 Building
  v1.1       Custom prompt templates                   📋 Planned
  ───────────────────────────────────────────────────────────
  v1.2       Multi-model support (Claude, GPT-4o)      📋 Planned
  v1.2       Screenshot-based analysis (Vision API)    📋 Planned
  v1.2       Share prompt via link                     📋 Planned
  ───────────────────────────────────────────────────────────
```

<br/>

---

<br/>

## 📜 License & Copyright

This project is licensed under the **MIT License**.  
Copyright (c) 2026 **codest0411** ([https://github.com/codest0411](https://github.com/codest0411)).  
All rights reserved.  

```
MIT License — free to use, modify, and distribute.
Built with ❤️ by Chirag Bhandarkar (codest0411)
```

<br/>

---

<br/>

<div align="center">

**[⭐ Star this repo](https://github.com/codest0411/SiteClone-AI) if it helped you build something awesome!**

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-codest0411-black?style=for-the-badge&logo=github)](https://github.com/codest0411)
[![Portfolio](https://img.shields.io/badge/Portfolio-chiragkb--04.vercel.app-purple?style=for-the-badge&logo=vercel)](https://chiragkb-04.vercel.app)

<br/>

*SiteBlueprint AI — See any website. Clone any website.*

</div>
