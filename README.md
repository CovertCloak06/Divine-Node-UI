# ⚡ Divine Node UI

A powerful, multiplatform OSINT (Open Source Intelligence) and AI Assistant application built with Electron.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

## 🌟 Features

### OSINT Modules
- **🌐 IP Lookup**: Investigate IP addresses with geolocation, ISP, and network information
- **🔍 Domain Lookup**: Analyze domains with WHOIS data and DNS records (A, MX, NS, TXT)
- **👤 Username Search**: Search for usernames across 15+ social media platforms
- **📧 Email Lookup**: Validate email addresses and detect disposable email services

### AI Integration
- **🤖 AI Assistant**: Get AI-powered insights for your OSINT work
- **Local AI Support**: Ollama integration for privacy-focused local AI
- **Cloud AI Support**: OpenAI API integration for powerful cloud-based AI
- **Context-Aware**: AI assistant understands OSINT context and provides relevant help

### UI/UX
- **🎨 Modern Interface**: Clean, intuitive design with dark/light themes
- **⚡ Fast & Responsive**: Built with Electron for native performance
- **🖥️ Multiplatform**: Works on Windows, macOS, and Linux
- **🔒 Privacy-Focused**: All data processing happens locally

## 📦 Installation

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/CovertCloak06/Divine-Node-UI.git
   cd Divine-Node-UI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

### Development Mode
Run with developer tools open:
```bash
npm run dev
```

## 🏗️ Building for Production

Build for your current platform:
```bash
npm run build
```

Build for specific platforms:
```bash
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

Build outputs will be in the `dist/` directory.

## 🔧 Configuration

### Setting up AI Features

#### Option 1: Ollama (Recommended for Privacy)
1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Install a model: `ollama pull llama2`
3. Start Ollama: `ollama serve`
4. The application will automatically detect and use Ollama

#### Option 2: OpenAI API
1. Get an API key from [OpenAI](https://platform.openai.com)
2. Open Divine Node UI and navigate to Settings
3. Enter your API key
4. Save settings

## 📖 Usage Guide

### IP Lookup
1. Navigate to the IP Lookup module
2. Enter an IP address (e.g., `8.8.8.8`)
3. Click "Lookup" to retrieve:
   - Geolocation (Country, Region, City)
   - ISP and Organization
   - Timezone and Coordinates

### Domain Lookup
1. Navigate to the Domain Lookup module
2. Enter a domain name (e.g., `example.com`)
3. View DNS records:
   - A Records (IPv4 addresses)
   - MX Records (Mail servers)
   - NS Records (Name servers)
   - TXT Records (Text records)

### Username Search
1. Navigate to the Username Search module
2. Enter a username
3. See results across platforms:
   - ✓ Found: Account exists (verified)
   - ✗ Not Found: No account found
   - Links to profiles when available

### Email Lookup
1. Navigate to the Email Lookup module
2. Enter an email address
3. Get validation results:
   - Format validation
   - Domain verification
   - MX record checking
   - Disposable email detection

### AI Assistant
1. Navigate to the AI Assistant module
2. Type your question or request
3. Get AI-powered insights on:
   - OSINT techniques
   - Tool recommendations
   - Data analysis help
   - Best practices

## 🛠️ Technology Stack

- **Framework**: Electron
- **Runtime**: Node.js
- **UI**: HTML5, CSS3, JavaScript
- **OSINT APIs**: 
  - ip-api.com (IP geolocation)
  - Native DNS lookups
  - Social media platform checks
- **AI Integration**:
  - Ollama (Local AI)
  - OpenAI API (Cloud AI)

## 🔒 Privacy & Security

- **Local Processing**: All OSINT lookups are processed locally when possible
- **No Data Collection**: Divine Node UI does not collect or store your data
- **API Key Security**: API keys are stored locally in your browser's localStorage
- **Open Source**: Full transparency - review the code yourself

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This tool is for educational and authorized security research purposes only. Always ensure you have permission before investigating systems, domains, or individuals. The developers are not responsible for misuse of this tool.

## 🙏 Acknowledgments

- ip-api.com for IP geolocation services
- Ollama team for local AI capabilities
- Electron team for the multiplatform framework
- All open-source contributors

## 📧 Support

For support, please open an issue on GitHub or contact the maintainer.

---

Made with ⚡ by CovertCloak06
