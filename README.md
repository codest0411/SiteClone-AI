# SiteClone-AI Chrome Extension

SiteClone-AI is a powerful Chrome Extension (Manifest V3) that analyzes any website's structure, design, and tech stack to generate a detailed clone prompt and development roadmap using the Groq AI (Llama-3.3-70B).

## ✨ Features

- **Website Analysis**: Deeply scans the DOM, CSS, layout, colors, and components.
- **Groq AI Integration**: Uses `llama-3.3-70b-versatile` for accurate clone instructions.
- **Dynamic Roadmap**: Provides a 8-step build plan for the target site.
- **Color Palette & Typography**: Identifies top hex colors and font families used.
- **Modern UI**: A premium dark-themed Side Panel for an immersive developer experience.

## 📦 File Structure

- `manifest.json`: Manifest V3 configuration.
- `background.js`: Handles Groq API requests and Chrome events.
- `content.js`: Injected script that extracts technical data from pages.
- `sidepanel/`: Contains the frontend logic, structure, and styling for the sidebar.
- `icons/`: Extension icons for 16px, 48px, and 128px displays.

## 🛠️ Getting Started

### 1. API Key Setup
Before using the extension, open `background.js` and set your Groq API Key:
```javascript
const GROQ_API_KEY = "YOUR_GROQ_API_KEY_HERE";
```
Get your key from [Groq Console](https://console.groq.com/keys).

### 2. Load the Extension
1. Open Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the extension folder.

## 📜 License & Copyright
This project is licensed under the **MIT License**.  
Copyright (c) 2026 **codest0411** ([https://github.com/codest0411](https://github.com/codest0411)).  
All rights reserved.  
Check the `LICENSE` file for more details.
