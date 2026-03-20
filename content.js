/**
 * Content script to analyze the webpage and extract DOM/CSS data.
 * Enhanced for Whole-Site Architecture awareness.
 */

function extractData() {
  const styles = window.getComputedStyle(document.body);
  const fonts = new Set();
  
  // Extract all unique internal links to map architecture
  const internalLinks = Array.from(document.querySelectorAll("a[href]"))
    .map(a => a.getAttribute("href"))
    .filter(href => {
      if (!href) return false;
      if (href.startsWith("/") || href.startsWith(window.location.origin)) return true;
      return false;
    })
    .map(href => href.startsWith("/") ? window.location.origin + href : href);

  const uniqueLinks = Array.from(new Set(internalLinks)).slice(0, 20); // Top 20 internal pages

  // Detailed Section Extraction
  const sections = Array.from(document.querySelectorAll("section, [class*='section'], [id*='section'], main > div")).slice(0, 15).map(s => {
    return {
      id: s.id || "",
      className: s.className || "",
      textSnippet: s.innerText.trim().substring(0, 100).replace(/\n/g, " "),
      hasImage: !!s.querySelector("img"),
      tag: s.tagName
    };
  });

  const data = {
    url: window.location.href,
    origin: window.location.origin,
    title: document.title,
    metaDescription: document.querySelector('meta[name="description"]')?.content || "",
    
    // Site Map Architecture (Crucial for "Entire Site" logic)
    siteArchitecture: {
      totalInternalLinks: internalLinks.length,
      topLinks: uniqueLinks,
      navigationItems: Array.from(document.querySelectorAll("nav a, header a, footer a"))
        .slice(0, 15)
        .map(a => ({ text: a.innerText.trim(), href: a.href }))
        .filter(n => n.text.length > 0)
    },

    // Detailed Layout
    layout: {
      type: detectLayout(),
      sections: sections,
      containerWidth: document.querySelector(".container, [class*='container']") ? "Fixed/Centered" : "Fluid",
      gridPattern: !!document.querySelector("[class*='grid'], [style*='display: grid']") ? "Modern Grid" : "Traditional",
    },
    
    // Components
    components: {
      navbar: !!document.querySelector("nav, .navbar, header"),
      hero: !!document.querySelector("[class*='hero'], #hero"),
      footer: !!document.querySelector("footer, .footer"),
      forms: Array.from(document.querySelectorAll("form")).map(f => ({ 
        id: f.id, 
        inputCount: f.querySelectorAll("input, select, textarea").length 
      })),
      buttons: Array.from(document.querySelectorAll("button, .btn, .button")).slice(0, 8).map(b => b.innerText.trim())
    },
    
    // Visual DNA
    visuals: {
      colorPalette: getDetailedColors(),
      fonts: getDetailedFonts(),
      isDarkTheme: isDarkTheme(),
      hasAnimations: document.querySelectorAll("[class*='animate'], [style*='animation']").length > 5
    },
    
    // Tech Stack Hints
    frameworks: detectFrameworks(),
    cssFramework: detectCSSFramework(),
  };

  return data;
}

function getDetailedColors() {
  const colorCounts = {};
  const elements = Array.from(document.querySelectorAll("*")).slice(0, 500);
  elements.forEach(el => {
    const s = window.getComputedStyle(el);
    [s.backgroundColor, s.color].forEach(c => {
      if (c && c !== "rgba(0, 0, 0, 0)" && c !== "transparent") {
        const hex = rgbToHex(c);
        colorCounts[hex] = (colorCounts[hex] || 0) + 1;
      }
    });
  });
  return Object.entries(colorCounts).sort((a,b) => b[1]-a[1]).slice(0, 8).map(e => e[0]);
}

function getDetailedFonts() {
  const fonts = new Set();
  const elements = Array.from(document.querySelectorAll("h1, h2, p, button")).slice(0, 20);
  elements.forEach(el => {
    const family = window.getComputedStyle(el).fontFamily.split(",")[0].replace(/['"]/g, "").trim();
    if (family) fonts.add(family);
  });
  return Array.from(fonts);
}

function isDarkTheme() {
  const bg = window.getComputedStyle(document.body).backgroundColor;
  const rgb = bg.match(/\d+/g);
  if (!rgb) return false;
  const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
  return brightness < 128;
}

function detectLayout() {
  const main = document.querySelector("main") || document.body;
  const s = window.getComputedStyle(main);
  if (s.display === "grid") return "CSS Grid";
  if (s.display === "flex") return "Flexbox";
  return "Standard Block";
}

function detectFrameworks() {
  const fs = [];
  if (window.__NEXT_DATA__) fs.push("Next.js");
  if (window.React || document.querySelector("[data-reactroot]")) fs.push("React");
  if (window.Vue || document.querySelector("[data-v-]")) fs.push("Vue.js");
  if (document.querySelector("script[src*='wp-content']")) fs.push("WordPress");
  if (document.querySelector("script[src*='shopify']")) fs.push("Shopify");
  return fs;
}

function detectCSSFramework() {
  const bodyClass = document.body.className;
  if (/tw-|text-|bg-/.test(bodyClass)) return "Tailwind CSS";
  if (document.querySelector("link[href*='bootstrap']")) return "Bootstrap";
  return "Custom/Native";
}

function rgbToHex(rgb) {
  const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return rgb;
  return "#" + [match[1], match[2], match[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('').toUpperCase();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "PING") { sendResponse({ status: "alive" }); return true; }
  if (request.action === "EXTRACT_DATA") {
    sendResponse(extractData());
  }
  return true;
});
