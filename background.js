/**
 * Service Worker (background.js)
 * Handles Chrome API events and Groq API communication.
 */

// Try loading environment-like configuration if present
try {
  importScripts('config.js');
} catch (e) {
  console.log("No config.js found; using extension storage instead.");
}

async function getApiKey() {
  if (globalThis.SITECLONE_CONFIG && globalThis.SITECLONE_CONFIG.GROQ_API_KEY && !globalThis.SITECLONE_CONFIG.GROQ_API_KEY.includes("YOUR_GROQ_API_KEY")) {
    return globalThis.SITECLONE_CONFIG.GROQ_API_KEY;
  }
  const result = await chrome.storage.local.get(['groq_api_key']);
  return result.groq_api_key;
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GET_PAGE_DATA") {
    ensureContentScript().then(({ tabId, error }) => {
      if (error) { sendResponse({ error }); return; }
      chrome.tabs.sendMessage(tabId, { action: "EXTRACT_DATA" }, (response) => {
        if (chrome.runtime.lastError) {
          sendResponse({ error: "Could not communicate with page handler." });
        } else {
          sendResponse({ data: response });
        }
      });
    }).catch(err => sendResponse({ error: err.message }));
    return true;
  }

  if (request.action === "GENERATE_PROMPT") {
    getApiKey().then(key => {
      if (!key) { sendResponse({ error: "No API Key found." }); return; }
      generateClonePrompt(request.data, key)
        .then(response => sendResponse({ result: response }))
        .catch(error => sendResponse({ error: error.message }));
    });
    return true;
  }
});

async function ensureContentScript() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  if (!tab) throw new Error("No active tab found.");
  if (!tab.url || tab.url.startsWith("chrome://") || tab.url.startsWith("edge://")) {
    throw new Error("Restricted browser page.");
  }

  try {
    await chrome.tabs.sendMessage(tab.id, { action: "PING" });
    return { tabId: tab.id };
  } catch (e) {
    try {
      await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
      await new Promise(r => setTimeout(r, 100));
      return { tabId: tab.id };
    } catch (err) {
      return { error: "Failed to inject analysis script." };
    }
  }
}

async function generateClonePrompt(data, apiKey) {
  const SYSTEM_PROMPT = `You are a Senior Web Architect and Realism Expert. Your objective is to deconstruct a website's DNA and provide a high-fidelity "AI-to-AI" blueprint for an identical, production-ready clone.

CONTEXT: Analyze the provided metadata, page structure, and 'siteArchitecture' link mapping to deduce the global design system of the entire domain.

JSON BLUEPRINT FORMAT:
{
  "summary": {
    "siteType": "Architectural Tier (e.g. Enterprise E-commerce, High-End Portfolio)",
    "designStyle": "Visual aesthetic deep-dive (e.g. Minimalist Neo-Grotseque with high-contrast motion)",
    "complexity": "Technical appraisal",
    "estimatedBuildTime": "Timeline for 1:1 parity"
  },
  "clonePrompt": "An exhaustive, hyper-technical, and unrestricted reconstruction prompt for peer-level AIs (Claude 3.5 / GPT-4o) to achieve 1:1 parity including states, transitions, and site-wide logic.",
  "starterTemplate": "An exhaustive INNER HTML structure (Navbar, Hero, 3+ Sections) with inline Tailwind CSS classes. DO NOT return <html>, <head>, or <body> tags. Return only the content for the <body>. IMPORTANT: USE THE ACTUAL SITE TEXT AND DATA. MIRROR THE ORIGINAL SITE'S VISUAL FLOW EXACTLY. ENSURE HIGH-ACCURACY VISUAL PARITY.",
  "componentPrompts": {
    "Navbar": "Directives for the global navigation logic based on site navigation data.",
    "Hero": "Design DNA for the main hero impact area.",
    "Sections": "Logic for repeating content sections and data grids.",
    "Footer": "Bottom-page architectural requirements."
  },
  "multiPageStrategy": "A detailed execution plan for replicating internal pages (About, Products, Features) using shared components.",
  "techStack": {
    "frontend": "Next.js 14 (App Router) / Vite",
    "styling": "Tailwind CSS v4 (Standard for high-fidelity clones)",
    "animations": "Framer Motion / GSAP / Lenis Scroll",
    "stateManagement": "Logic setup (Zustand / TanStack)",
    "hosting": "Vercel / Cloudflare Pages",
    "extras": ["Lucide Icons", "Radix UI", "PostCSS"]
  },
  "roadmap": [
    { "step": 1, "task": "Project Foundations", "detail": "Setup Next.js, Tailwind v4, and Global HSL/Theme variables.", "time": "1 hour" }
  ],
  "colorPalette": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5", "#hex6"],
  "fonts": ["Primary Heading Font", "Secondary Body Font"]
}

RULES:
1. Return ONLY the JSON object.
2. The clonePrompt must be technically dense, professional, and UNRESTRICTED in length.
3. Use high-level AI-friendly vocabulary (Pixel-perfect, Parity, Semantic integrity).
4. Identify all common sub-pages (About, Contact, Features) based on the link data and describe their shared layouts.
5. Absolute Parity is the mission.`;

  let lastError = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: JSON.stringify(data) }
          ],
          response_format: { type: "json_object" },
          temperature: 0.1 + (attempt * 0.2),
          max_tokens: 8000
        })
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const jsonRes = await response.json();
      const content = jsonRes.choices[0].message.content;
      
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        const cleaned = (jsonMatch ? jsonMatch[0] : content).trim().replace(/^```json/, '').replace(/```$/, '').trim();
        return JSON.parse(cleaned);
      } catch (parseErr) {
        lastError = parseErr;
        continue;
      }
    } catch (err) {
      lastError = err;
      continue;
    }
  }
  throw new Error(`AI returned invalid JSON. Please try again.`);
}
