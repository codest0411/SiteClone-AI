// options.js
document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveBtn = document.getElementById('saveBtn');
  const statusDiv = document.getElementById('status');

  // Load existing API Key
  chrome.storage.local.get(['groq_api_key'], (result) => {
    if (result.groq_api_key) {
      apiKeyInput.value = result.groq_api_key;
    }
  });

  // Save API Key
  saveBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
      chrome.storage.local.set({ groq_api_key: key }, () => {
        statusDiv.classList.add('success');
        statusDiv.textContent = 'Configuration saved successfully!';
        setTimeout(() => {
          statusDiv.classList.remove('success');
          statusDiv.style.display = 'none';
        }, 3000);
      });
    } else {
      statusDiv.classList.remove('success');
      statusDiv.style.display = 'block';
      statusDiv.style.background = 'rgba(239, 68, 68, 0.1)';
      statusDiv.style.color = '#ef4444';
      statusDiv.style.border = '1px solid rgba(239, 68, 68, 0.2)';
      statusDiv.textContent = 'Please enter a valid API key.';
    }
  });
});
