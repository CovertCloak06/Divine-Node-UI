# Divine Node UI - User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [OSINT Modules](#osint-modules)
3. [AI Assistant](#ai-assistant)
4. [Tips & Best Practices](#tips--best-practices)
5. [Troubleshooting](#troubleshooting)

## Getting Started

### First Launch
When you first launch Divine Node UI, you'll see the Dashboard with cards for each OSINT module. Click on any card to navigate to that module.

### Interface Overview
- **Sidebar**: Navigation menu on the left
- **Main Area**: Active module content
- **Theme Toggle**: Switch between dark and light modes
- **Settings**: Configure API keys and preferences

## OSINT Modules

### IP Lookup Module

**Purpose**: Investigate IP addresses to gather geolocation and network information.

**When to Use**:
- Identifying the geographic location of a server
- Investigating suspicious IP addresses
- Finding ISP and organization information
- Gathering timezone data for correlation

**How to Use**:
1. Click "IP Lookup" in the sidebar
2. Enter the IP address (IPv4 format)
3. Click "Lookup" or press Enter
4. Review the results:
   - Country, Region, City
   - ISP and Organization
   - Latitude/Longitude
   - Timezone

**Example Queries**:
- `8.8.8.8` (Google DNS)
- `1.1.1.1` (Cloudflare DNS)
- Any public IP address

**Limitations**:
- Does not work with private IP ranges (192.168.x.x, 10.x.x.x)
- Geolocation accuracy varies by provider

### Domain Lookup Module

**Purpose**: Analyze domain names and retrieve DNS information.

**When to Use**:
- Investigating website infrastructure
- Checking domain ownership (basic info)
- Analyzing email server configuration (MX records)
- Identifying name servers

**How to Use**:
1. Click "Domain Lookup" in the sidebar
2. Enter the domain name (without http://)
3. Click "Lookup" or press Enter
4. Review DNS records:
   - A Records: IP addresses
   - MX Records: Mail servers
   - NS Records: Name servers
   - TXT Records: Additional info (SPF, DKIM, etc.)

**Example Queries**:
- `google.com`
- `github.com`
- `example.com`

**WHOIS Information**:
Note: Full WHOIS data requires API integration. Currently shows basic DNS information.

### Username Search Module

**Purpose**: Search for usernames across multiple social media platforms.

**When to Use**:
- Finding social media profiles
- Investigating online presence
- Identifying account relationships
- OSINT reconnaissance

**How to Use**:
1. Click "Username Search" in the sidebar
2. Enter the username (without @ symbol)
3. Click "Search" or press Enter
4. Review results across platforms

**Platforms Checked**:
- GitHub (verified via API)
- Reddit (verified via API)
- Twitter/X (link provided)
- Instagram (link provided)
- YouTube (link provided)
- LinkedIn (link provided)
- Facebook (link provided)
- TikTok (link provided)
- Twitch (link provided)
- Medium (link provided)
- Pinterest (link provided)
- Tumblr (link provided)
- Snapchat (link provided)
- Telegram (link provided)

**Understanding Results**:
- ✓ **Found**: Account verified to exist
- ✗ **Not Found**: No account found
- **Unknown**: Platform not checked (link provided for manual verification)

### Email Lookup Module

**Purpose**: Validate email addresses and gather basic information.

**When to Use**:
- Verifying email format
- Checking if email domain exists
- Identifying email provider
- Detecting disposable email addresses

**How to Use**:
1. Click "Email Lookup" in the sidebar
2. Enter the email address
3. Click "Lookup" or press Enter
4. Review validation results

**Information Provided**:
- Format validation
- Domain extraction
- Email provider identification
- Disposable email detection
- MX record verification

**Common Providers Detected**:
- Gmail, Yahoo, Outlook
- ProtonMail, iCloud
- Zoho, AOL, and more

## AI Assistant

### Overview
The AI Assistant provides intelligent help for your OSINT work.

### Setup Options

#### Option 1: Ollama (Local AI)
**Advantages**: Privacy, no API costs, offline capability

**Setup Steps**:
1. Install Ollama from https://ollama.ai
2. Open terminal and run: `ollama pull llama2`
3. Start Ollama: `ollama serve`
4. Divine Node UI will auto-detect Ollama

**Supported Models**:
- llama2 (recommended)
- mistral
- codellama
- Others from Ollama library

#### Option 2: OpenAI API
**Advantages**: More powerful, no local setup

**Setup Steps**:
1. Get API key from https://platform.openai.com
2. Open Settings in Divine Node UI
3. Enter your API key
4. Save settings

### Using the AI Assistant

1. Navigate to "AI Assistant"
2. Type your question in the chat input
3. Press Enter or click "Send"
4. AI will respond with helpful information

**Example Questions**:
- "How do I investigate a suspicious email?"
- "What OSINT tools should I use for domain research?"
- "Explain the difference between WHOIS and DNS lookup"
- "What are best practices for ethical OSINT?"

## Tips & Best Practices

### OSINT Best Practices

1. **Always Get Permission**: Only investigate systems you're authorized to analyze
2. **Document Everything**: Keep notes on your findings
3. **Verify Information**: Cross-reference data from multiple sources
4. **Stay Legal**: Know your local laws regarding OSINT
5. **Respect Privacy**: Don't use OSINT for harassment or stalking

### Efficient Usage

1. **Use Keyboard Shortcuts**: Press Enter to submit searches
2. **Switch Themes**: Use dark mode for low-light environments
3. **Combine Modules**: Use multiple modules for comprehensive research
4. **Save API Keys**: Configure once in Settings, use everywhere
5. **Local AI for Privacy**: Use Ollama when working with sensitive data

### Data Export

Currently, you can manually copy results. Future versions will include:
- JSON export
- CSV export
- Report generation
- Screenshot capture

## Troubleshooting

### Common Issues

#### "No DNS records found"
- **Cause**: Domain doesn't exist or has no A records
- **Solution**: Verify domain spelling and try again

#### "AI not responding"
- **Cause**: Neither Ollama nor OpenAI is configured
- **Solution**: 
  1. Install and run Ollama, OR
  2. Add OpenAI API key in Settings

#### "IP lookup failed"
- **Cause**: Invalid IP or network issue
- **Solution**: 
  1. Verify IP format (e.g., 8.8.8.8)
  2. Check internet connection
  3. Try again after a moment

#### "Username search shows unknown"
- **Cause**: Platform doesn't have public API
- **Solution**: Click provided link to manually check

### Network Issues

If lookups are failing:
1. Check your internet connection
2. Verify no firewall is blocking the app
3. Some corporate networks block OSINT tools
4. Try with a different network

### Performance Issues

If the app is slow:
1. Close other applications
2. Restart Divine Node UI
3. Check system resources
4. Update to latest version

### Getting Help

1. Check this guide first
2. Review the main README.md
3. Open an issue on GitHub
4. Include error messages and steps to reproduce

## Advanced Usage

### Combining OSINT Techniques

**Investigation Workflow Example**:
1. Start with IP Lookup on a suspicious IP
2. Note the ISP and organization
3. Use Domain Lookup on any associated domains
4. Check MX records for email infrastructure
5. Search usernames found in WHOIS data
6. Validate email addresses from findings
7. Ask AI Assistant for analysis recommendations

### Automation Tips

While Divine Node UI focuses on manual investigation, you can:
1. Keep a separate document for findings
2. Use browser bookmarks for found profiles
3. Take screenshots for documentation
4. Export settings for team collaboration

## Privacy & Security

### Your Data
- All searches are performed from your computer
- No data is sent to Divine Node UI servers (we don't have any!)
- API keys stored locally in browser localStorage
- No telemetry or tracking

### API Keys
- Stored locally only
- Never transmitted except to configured services
- Clear browser data to remove
- Each user should use their own keys

### Best Practices
1. Don't share your API keys
2. Use Ollama for sensitive investigations
3. Clear cache if using shared computer
4. Review privacy policies of external APIs

---

**Need more help?** Visit the GitHub repository or contact support.
