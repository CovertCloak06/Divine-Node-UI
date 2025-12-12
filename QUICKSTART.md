# Quick Start Guide - Divine Node UI

This guide will help you get Divine Node UI up and running in minutes.

## Prerequisites

Before you begin, make sure you have:
- **Node.js** version 16.x or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- At least 500MB of free disk space

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/CovertCloak06/Divine-Node-UI.git
cd Divine-Node-UI
```

### 2. Install Dependencies

```bash
npm install
```

This will install Electron and other required packages. It may take a few minutes.

### 3. Run the Application

**Development Mode** (with DevTools open):
```bash
npm run dev
```

**Normal Mode**:
```bash
npm start
```

The application window should open automatically!

## First Steps After Launch

### 1. Explore the Interface
- The dashboard shows all available OSINT modules
- Click any card to navigate to that module
- Use the sidebar for quick navigation

### 2. Test OSINT Modules

**Try IP Lookup**:
1. Click "IP Lookup" in sidebar
2. Enter: `8.8.8.8`
3. Click "Lookup"
4. View geolocation and ISP information

**Try Domain Lookup**:
1. Click "Domain Lookup"
2. Enter: `github.com`
3. Click "Lookup"
4. View DNS records

**Try Username Search**:
1. Click "Username Search"
2. Enter: `github`
3. Click "Search"
4. See which platforms have this username

**Try Email Lookup**:
1. Click "Email Lookup"
2. Enter: `test@gmail.com`
3. Click "Lookup"
4. See validation results

### 3. Configure AI (Optional)

You have two options for AI features:

#### Option A: Ollama (Local, Privacy-Focused)

1. **Install Ollama**:
   - Visit https://ollama.ai
   - Download for your platform (Windows/Mac/Linux)
   - Install and run

2. **Install a Model**:
   ```bash
   ollama pull llama2
   ```

3. **Start Ollama**:
   ```bash
   ollama serve
   ```

4. **Use AI Assistant**:
   - Open Divine Node UI
   - Click "AI Assistant"
   - Start chatting!

#### Option B: OpenAI (Cloud-Based)

1. **Get API Key**:
   - Go to https://platform.openai.com
   - Sign up/Login
   - Create an API key

2. **Configure in Divine Node**:
   - Open Divine Node UI
   - Click "Settings" in sidebar
   - Enter your OpenAI API key
   - Click "Save Settings"

3. **Use AI Assistant**:
   - Click "AI Assistant"
   - Start asking questions!

### 4. Customize Your Experience

**Change Theme**:
- Click the theme toggle button in the sidebar
- Switch between dark and light modes

**Save Settings**:
- All settings are saved automatically in your browser's local storage
- Your preferences persist between sessions

## Building for Production

To create standalone applications:

**For Windows**:
```bash
npm run build:win
```

**For macOS**:
```bash
npm run build:mac
```

**For Linux**:
```bash
npm run build:linux
```

**For All Platforms**:
```bash
npm run build
```

Build outputs will be in the `dist/` directory.

## Keyboard Shortcuts

- **Enter**: Submit search in any OSINT module
- **Enter**: Send message in AI Assistant

## Common Issues

### Application won't start
- Make sure Node.js is installed: `node --version`
- Reinstall dependencies: `npm install`
- Check console for errors

### OSINT lookups fail
- Check your internet connection
- Some corporate networks block OSINT tools
- Try a different network if issues persist

### AI Assistant not working
- Make sure Ollama is running: `ollama serve`
- Or check your OpenAI API key in Settings
- See error messages in chat for details

## Getting Help

- **User Guide**: See `USER_GUIDE.md` for detailed documentation
- **GitHub Issues**: Report bugs or request features
- **Contributing**: See `CONTRIBUTING.md` to contribute

## What's Next?

- Read the full User Guide for advanced features
- Try all OSINT modules with real data
- Configure AI for enhanced insights
- Build production versions for your platform

---

**Enjoy using Divine Node UI! ⚡**

For detailed documentation, see [USER_GUIDE.md](USER_GUIDE.md)
