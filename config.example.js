// SiteClone-AI Template Configuration
// Copy this file to 'config.js' and add your API key.

const SITECLONE_CONFIG = {
  GROQ_API_KEY: "gsk_..." // Get your key from https://console.groq.com/keys
};

if (typeof globalThis !== 'undefined') {
  globalThis.SITECLONE_CONFIG = SITECLONE_CONFIG;
}
