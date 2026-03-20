/**
 * UI Logic for the Side Panel
 */

document.addEventListener("DOMContentLoaded", () => {
  const analyzeBtn = document.getElementById("analyze-btn");
  const refreshBtn = document.getElementById("refresh-btn");
  const copyBtn = document.getElementById("copy-btn");
  const urlEl = document.getElementById("current-url");
  const statusMessage = document.getElementById("status-message");
  const resultsArea = document.getElementById("results-area");
  const loadingState = document.getElementById("loading-state");

  // Initialize URL display
  updateCurrentUrl();

  // Listen for tab changes
  chrome.tabs.onActivated.addListener(updateCurrentUrl);
  chrome.tabs.onUpdated.addListener(updateCurrentUrl);

  refreshBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id);
    });
  });

  analyzeBtn.addEventListener("click", () => {
    analyzeBtn.disabled = true;
    showStatus("Analyzing website structure...", "info");
    showLoading(true);
    resultsArea.classList.add("hidden");

    // 1. Get Page Data
    chrome.runtime.sendMessage({ action: "GET_PAGE_DATA" }, (response) => {
      if (response && response.error) {
        showError(response.error);
        resetUI();
        return;
      }

      if (response && response.data) {
        showStatus("Generating clone prompt with Llama 3.3...", "info");
        
        // 2. Generate Prompt via AI
        chrome.runtime.sendMessage({ action: "GENERATE_PROMPT", data: response.data }, (aiResponse) => {
          if (aiResponse && aiResponse.error) {
            showError(aiResponse.error);
            resetUI();
            return;
          }

          if (aiResponse && aiResponse.result) {
            renderResults(aiResponse.result);
            hideStatus();
            resultsArea.classList.remove("hidden");
          }
          resetUI();
        });
      }
    });
  });

  copyBtn.addEventListener("click", () => {
    const text = document.getElementById("clone-prompt-text").innerText;
    navigator.clipboard.writeText(text).then(() => {
      const originalText = copyBtn.innerText;
      copyBtn.innerText = "COPIED!";
      setTimeout(() => copyBtn.innerText = originalText, 2000);
    });
  });

  function updateCurrentUrl() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].url) {
        try {
          const url = new URL(tabs[0].url);
          urlEl.innerText = url.hostname;
        } catch (e) {
          urlEl.innerText = "Internal Page";
        }
      }
    });
  }

  function renderResults(res) {
    // Summary
    document.getElementById("site-type").innerText = res.summary.siteType;
    document.getElementById("design-style").innerText = res.summary.designStyle;
    document.getElementById("complexity").innerText = res.summary.complexity;
    document.getElementById("build-time").innerText = res.summary.estimatedBuildTime;

    // Prompt
    document.getElementById("clone-prompt-text").innerText = res.clonePrompt;

    // Tech Stack
    const techContainer = document.getElementById("tech-stack-list");
    techContainer.innerHTML = "";
    const stack = res.techStack;
    const items = [stack.frontend, stack.styling, stack.animations, stack.cms, stack.hosting, ...(stack.extras || [])];
    items.filter(Boolean).forEach(item => {
      const tag = document.createElement("span");
      tag.className = "tech-tag";
      tag.innerText = item;
      techContainer.appendChild(tag);
    });

    // Roadmap
    const roadMapContainer = document.getElementById("roadmap-list");
    roadMapContainer.innerHTML = "";
    res.roadmap.forEach(step => {
      const stepEl = document.createElement("div");
      stepEl.className = "step-card";
      stepEl.innerHTML = `
        <div class="step-num">${step.step}</div>
        <div class="step-info">
          <h4>${step.task}</h4>
          <p>${step.detail}</p>
          <span class="step-time">${step.time}</span>
        </div>
      `;
      roadMapContainer.appendChild(stepEl);
    });

    // Colors
    const palette = document.getElementById("color-palette");
    palette.innerHTML = "";
    (res.colorPalette || []).slice(0, 6).forEach(color => {
      const swatch = document.createElement("div");
      swatch.className = "swatch";
      swatch.innerHTML = `
        <div class="swatch-circle" style="background-color: ${color}"></div>
        <span class="swatch-hex">${color}</span>
      `;
      palette.appendChild(swatch);
    });

    // Fonts
    const fontsContainer = document.getElementById("fonts-container");
    fontsContainer.innerHTML = "";
    (res.fonts || []).forEach(font => {
      const tag = document.createElement("span");
      tag.className = "tech-tag";
      tag.innerText = font;
      fontsContainer.appendChild(tag);
    });

    showLoading(false);
  }

  function showStatus(msg, type) {
    statusMessage.innerText = msg;
    statusMessage.classList.remove("hidden", "status-error");
    if (type === "error") statusMessage.classList.add("status-error");
  }

  function showError(msg) {
    statusMessage.innerHTML = typeof msg === 'string' && msg.includes("options") ? 
      `<span>${msg} <a href="#" id="open-options" style="color:#fff; text-decoration:underline;">Options Page</a></span>` : 
      msg;
    statusMessage.classList.remove("hidden");
    statusMessage.classList.add("status-toast");
    
    const openOptionsLink = document.getElementById("open-options");
    if (openOptionsLink) {
      openOptionsLink.addEventListener("click", (e) => {
        e.preventDefault();
        chrome.runtime.openOptionsPage();
      });
    }
  }

  function hideStatus() {
    statusMessage.classList.add("hidden");
  }

  function showLoading(show) {
    if (show) {
      loadingState.classList.remove("hidden");
      resultsArea.classList.add("hidden");
    } else {
      loadingState.classList.add("hidden");
    }
  }

  function resetUI() {
    analyzeBtn.disabled = false;
    showLoading(false);
  }
});
