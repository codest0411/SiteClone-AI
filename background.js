/**
 * Service Worker (background.js)
 * Handles Chrome API events and Groq API communication.
 */

// Replace with your Groq API Key
const GROQ_API_KEY = "YOUR_GROQ_API_KEY_HERE";

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
});

// Listener for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GET_PAGE_DATA") {
    getCurrentTab().then(tab => {
      if (!tab) {
        sendResponse({ error: "No active tab found." });
        return;
      }
      
      // Inject logic if not already present or just message the content script
      chrome.tabs.sendMessage(tab.id, { action: "EXTRACT_DATA" }, (response) => {
        if (chrome.runtime.lastError) {
          // Fallback: manually execute script if content script isn't loaded (e.g., restricted URLs)
          sendResponse({ error: "Could not analyze this page (restricted site or script blocked)." });
        } else {
          sendResponse({ data: response });
        }
      });
    });
    return true; // Keep channel open
  }

  if (request.action === "GENERATE_PROMPT") {
    const extractedData = request.data;
    
    if (!GROQ_API_KEY || GROQ_API_KEY.includes("YOUR_GROQ_API_KEY")) {
      sendResponse({ error: "Add your Groq API key in background.js" });
      return true;
    }

    generateClonePrompt(extractedData)
      .then(response => sendResponse({ result: response }))
      .catch(error => sendResponse({ error: error.message }));
      
    return true; // Keep channel open
  }
});

async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function generateClonePrompt(data) {
  const SYSTEM_PROMPT = `You are a senior frontend architect. Given extracted website data, generate a response in this EXACT JSON format:
{
  "summary": {
    "siteType": "E-commerce / Portfolio / SaaS / Blog / etc.",
    "designStyle": "Minimalist / Bold / Corporate / Playful / etc.",
    "complexity": "Simple / Medium / Complex",
    "estimatedBuildTime": "X days"
  },
  "clonePrompt": "A single detailed paragraph prompt (300-400 words) that a developer can paste into an AI to build this exact website. Include: layout description, all sections in order, color palette, typography, animations, responsive behavior, interactions, and any special features detected.",
  "techStack": {
    "frontend": "recommended framework",
    "styling": "recommended CSS approach",
    "animations": "recommended animation library or 'CSS only'",
    "stateManagement": "if needed",
    "backend": "if needed",
    "cms": "if content-heavy",
    "hosting": "recommended platform",
    "extras": ["any other tools"]
  },
  "roadmap": [
    { "step": 1, "task": "Project setup", "detail": "...", "time": "30 mins" },
    { "step": 2, "task": "Initial Layout", "detail": "...", "time": "2 hours" },
    { "step": 3, "task": "Component Building", "detail": "...", "time": "..." },
    { "step": 4, "task": "Logic implementation", "detail": "...", "time": "..." },
    { "step": 5, "task": "Advanced animations", "detail": "...", "time": "..." },
    { "step": 6, "task": "Data binding", "detail": "...", "time": "..." },
    { "step": 7, "task": "Testing & Responsive", "detail": "...", "time": "..." },
    { "step": 8, "task": "Deployment", "detail": "...", "time": "..." }
  ],
  "colorPalette": ["#hex1", "#hex2", "#hex3", "#hex4"],
  "fonts": ["Font 1", "Font 2"]
}
Return ONLY valid JSON. No markdown, no explanation.`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: JSON.stringify(data) }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`API error: ${response.status} - ${errBody}`);
    }

    const json = await response.json();
    const content = json.choices[0].message.content;
    
    try {
      // Clean content if it contains markdown formatting
      const cleanedContent = content.trim().replace(/^```json/, '').replace(/```$/, '').trim();
      return JSON.parse(cleanedContent);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr, content);
      throw new Error("Failed to parse AI response. Retrying may help.");
    }
  } catch (error) {
    console.error("Groq API error:", error);
    throw error;
  }
}
