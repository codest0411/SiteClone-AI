document.addEventListener('DOMContentLoaded', () => {
  const analyzeBtn = document.getElementById('analyze-btn');
  const refreshBtn = document.getElementById('refresh-btn');
  const resultsArea = document.getElementById('results-area');
  const loadingState = document.getElementById('loading-state');
  const statusMsg = document.getElementById('status-message');
  const currentUrlSpan = document.getElementById('current-url');
  const copyBtn = document.getElementById('copy-btn');
  
  // Set initial URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      const url = new URL(tabs[0].url);
      currentUrlSpan.textContent = url.hostname;
    }
  });

  // Analyze function
  const runAnalysis = async () => {
    toggleLoading(true);
    showStatus(''); // Clear errors
    
    try {
      // 1. Get Page Data from Content Script
      const extractResponse = await chrome.runtime.sendMessage({ action: 'GET_PAGE_DATA' });
      
      if (extractResponse.error) {
        throw new Error(extractResponse.error);
      }
      
      const pageData = extractResponse.data;
      
      // 2. Generate Prompt using Background/Groq
      const generateResponse = await chrome.runtime.sendMessage({ 
        action: 'GENERATE_PROMPT', 
        data: pageData 
      });
      
      if (generateResponse.error) {
        throw new Error(generateResponse.error);
      }
      
      renderResults(generateResponse.result);
      toggleLoading(false);
      resultsArea.classList.remove('hidden');
      
    } catch (error) {
      console.error(error);
      toggleLoading(false);
      showStatus(error.message);
    }
  };

  analyzeBtn.addEventListener('click', runAnalysis);
  refreshBtn.addEventListener('click', () => {
    window.location.reload();
  });

  copyBtn.addEventListener('click', () => {
    const text = document.getElementById('clone-prompt-text').innerText;
    navigator.clipboard.writeText(text).then(() => {
      const originalText = copyBtn.innerText;
      copyBtn.innerText = 'Copied!';
      copyBtn.style.backgroundColor = '#10b981'; // Green
      setTimeout(() => {
        copyBtn.innerText = originalText;
        copyBtn.style.backgroundColor = '';
      }, 2000);
    });
  });

  function toggleLoading(isLoading) {
    analyzeBtn.disabled = isLoading;
    if (isLoading) {
      analyzeBtn.innerText = 'Analyzing...';
      loadingState.classList.remove('hidden');
      resultsArea.classList.add('hidden');
    } else {
      analyzeBtn.innerText = 'Analyze This Site';
      loadingState.classList.add('hidden');
    }
  }

  function showStatus(msg) {
    if (msg) {
      statusMsg.textContent = msg;
      statusMsg.classList.remove('hidden');
    } else {
      statusMsg.classList.add('hidden');
    }
  }

  function renderResults(data) {
    // Summary
    document.getElementById('site-type').textContent = data.summary.siteType;
    document.getElementById('design-style').textContent = data.summary.designStyle;
    document.getElementById('complexity').textContent = data.summary.complexity;
    document.getElementById('build-time').textContent = data.summary.estimatedBuildTime;
    
    // Clone Prompt
    document.getElementById('clone-prompt-text').innerText = data.clonePrompt;
    
    // Tech Stack
    const techStackList = document.getElementById('tech-stack-list');
    techStackList.innerHTML = '';
    const items = [
      { label: 'Frontend', value: data.techStack.frontend },
      { label: 'Styling', value: data.techStack.styling },
      { label: 'Animations', value: data.techStack.animations },
      { label: 'Hosting', value: data.techStack.hosting }
    ];
    if (data.techStack.backend) items.push({ label: 'Backend', value: data.techStack.backend });
    if (data.techStack.extras && data.techStack.extras.length > 0) {
      items.push({ label: 'Extras', value: data.techStack.extras.join(', ') });
    }
    
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
      techStackList.appendChild(li);
    });

    // Roadmap
    const roadmapList = document.getElementById('roadmap-list');
    roadmapList.innerHTML = '';
    data.roadmap.forEach((step) => {
      const div = document.createElement('div');
      div.className = 'roadmap-item';
      div.innerHTML = `
        <div class="roadmap-step-num">${step.step}</div>
        <div class="roadmap-content">
          <h4>${step.task}</h4>
          <p>${step.detail}</p>
          <span class="roadmap-time">Time: ${step.time}</span>
        </div>
      `;
      roadmapList.appendChild(div);
    });

    // Color Palette
    const palette = document.getElementById('color-palette');
    palette.innerHTML = '';
    data.colorPalette.forEach(hex => {
      const wrapper = document.createElement('div');
      wrapper.className = 'color-swatch-wrapper';
      wrapper.innerHTML = `
        <div class="color-circle" style="background-color: ${hex}"></div>
        <span class="color-hex">${hex}</span>
      `;
      palette.appendChild(wrapper);
    });

    // Fonts
    const fontsContainer = document.getElementById('fonts-container');
    fontsContainer.innerHTML = '';
    data.fonts.forEach(font => {
      const tag = document.createElement('span');
      tag.className = 'font-tag';
      tag.textContent = font;
      fontsContainer.appendChild(tag);
    });
  }
});
