/**
 * Content script to analyze the webpage and extract DOM/CSS data.
 */

function extractData() {
  const styles = window.getComputedStyle(document.body);
  const colorPalette = [];
  const fonts = new Set();
  
  // Basic info
  const data = {
    url: window.location.href,
    title: document.title,
    metaDescription: document.querySelector('meta[name="description"]')?.content || "",
    
    // Layout
    layoutType: detectLayout(),
    totalSections: document.querySelectorAll("section, div[id*='section'], div[class*='section']").length || 1,
    hasHero: !!document.querySelector("header + section, .hero, #hero, [class*='hero-']"),
    hasNavbar: !!document.querySelector("nav, .navbar, #navbar, header"),
    hasFooter: !!document.querySelector("footer, .footer, #footer"),
    hasSidebar: !!document.querySelector("aside, .sidebar, #sidebar"),
    
    // Visual
    colorPalette: [],
    fonts: [],
    hasAnimations: hasWebAnimations(),
    hasStickyElements: !!document.querySelector("[style*='position: sticky'], .sticky, #sticky"),
    isResponsive: !!document.querySelector('meta[name="viewport"]'),
    
    // Components detected
    components: {
      navbar: !!document.querySelector("nav, .nav, .navbar"),
      hero: !!document.querySelector(".hero, #hero, [class*='hero']"),
      cards: !!document.querySelector(".card, [class*='card']"),
      carousel: !!document.querySelector(".carousel, .swiper, .slick-slider"),
      modal: !!document.querySelector(".modal, [class*='modal']"),
      forms: !!document.querySelector("form"),
      tables: !!document.querySelector("table"),
      video: !!document.querySelector("video, iframe[src*='youtube'], iframe[src*='vimeo']"),
      imageGallery: !!document.querySelector(".gallery, [class*='gallery']"),
      testimonials: !!document.querySelector(".testimonial, [class*='testimonial']"),
      pricing: !!document.querySelector(".pricing, [class*='pricing']"),
      cta: !!document.querySelector("button, .btn, .cta, [class*='cta']"),
      footer: !!document.querySelector("footer"),
    },
    
    // Content structure
    headings: Array.from(document.querySelectorAll("h1, h2, h3")).slice(0, 10).map(h => ({ tag: h.tagName, text: h.innerText.trim() })),
    navLinks: Array.from(document.querySelectorAll("nav a, header a")).slice(0, 10).map(a => a.innerText.trim()).filter(t => t.length > 0),
    ctaButtons: Array.from(document.querySelectorAll("button, .btn, .button")).slice(0, 10).map(b => b.innerText.trim()).filter(t => t.length > 0),
    imageCount: document.querySelectorAll("img").length,
    
    // Tech hints
    frameworks: detectFrameworks(),
    cssFramework: detectCSSFramework(),
  };

  // Analyze colors and fonts
  const allElements = Array.from(document.querySelectorAll("*")).slice(0, 500); // Sample first 500 elements for performance
  const colorCounts = {};
  
  allElements.forEach(el => {
    const s = window.getComputedStyle(el);
    const bg = s.backgroundColor;
    const color = s.color;
    const font = s.fontFamily.split(",")[0].replace(/['"]/g, "").trim();
    
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      const hex = rgbToHex(bg);
      colorCounts[hex] = (colorCounts[hex] || 0) + 1;
    }
    if (font) fonts.add(font);
  });

  data.colorPalette = Object.entries(colorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(entry => entry[0]);
    
  data.fonts = Array.from(fonts).slice(0, 5);
  
  return data;
}

function detectLayout() {
  const bodyStyles = window.getComputedStyle(document.body);
  if (bodyStyles.display === "grid") return "grid";
  if (bodyStyles.display === "flex") return "flexbox";
  const main = document.querySelector("main") || document.body;
  const mainStyles = window.getComputedStyle(main);
  if (mainStyles.display === "grid") return "grid";
  if (mainStyles.display === "flex") return "flexbox";
  return "mixed";
}

function hasWebAnimations() {
  return document.getAnimations().length > 0 || !!document.querySelector("[class*='animate'], [style*='animation']");
}

function detectFrameworks() {
  const frameworks = [];
  if (window.__NEXT_DATA__) frameworks.push("Next.js");
  if (window.React || document.querySelector("[data-reactroot]")) frameworks.push("React");
  if (window.Vue || document.querySelector("[data-v-")) frameworks.push("Vue.js");
  if (document.querySelector("[ng-app], [ng-version]")) frameworks.push("Angular");
  if (window.Svelte || document.querySelector(".svelte-")) frameworks.push("Svelte");
  return frameworks;
}

function detectCSSFramework() {
  const classes = document.body.className;
  if (/tw-|text-|bg-|p-|m-/.test(classes)) return "Tailwind CSS";
  if (document.querySelector("[class*='btn-'], [class*='container-fluid']")) return "Bootstrap";
  if (document.querySelector("[class*='Mui']")) return "Material UI";
  if (document.querySelector("[class*='ant-']")) return "Ant Design";
  return "Native CSS / Custom";
}

function rgbToHex(rgb) {
  if (!rgb) return "";
  const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(\.\d+)?))?\)$/);
  if (!match) return rgb;
  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Listen for messages from background/panel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "EXTRACT_DATA") {
    sendResponse(extractData());
  }
  return true;
});
