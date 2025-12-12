# Troubleshooting Guide - Divine Node UI

This guide helps you resolve common issues with Divine Node UI.

## Installation Issues

### Error: "npm: command not found"

**Problem**: Node.js/npm is not installed or not in PATH

**Solution**:
1. Install Node.js from https://nodejs.org/
2. Restart your terminal
3. Verify: `node --version` and `npm --version`

### Error: "Cannot find module 'electron'"

**Problem**: Dependencies not installed properly

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "EACCES: permission denied"

**Problem**: Insufficient permissions

**Solution (Linux/Mac)**:
```bash
sudo chown -R $USER ~/.npm
npm install
```

**Solution (Windows)**:
Run terminal as Administrator

## Application Startup Issues

### Application window doesn't open

**Diagnosis**:
```bash
npm run dev
```

Check the console output for errors.

**Common Fixes**:
1. Update Electron: `npm install electron@latest`
2. Clear cache: `npm cache clean --force`
3. Reinstall: `rm -rf node_modules && npm install`

### "Error: Electron failed to install correctly"

**Solution**:
```bash
cd node_modules/electron
node install.js
```

### Black screen on startup

**Problem**: Renderer process error

**Solution**:
1. Open with DevTools: `npm run dev`
2. Check Console tab for JavaScript errors
3. Verify all files in `src/renderer/` exist

## OSINT Module Issues

### IP Lookup Returns Errors

**Error**: "Failed to lookup IP address"

**Possible Causes**:
1. Invalid IP format
2. No internet connection
3. API rate limiting
4. Firewall blocking requests

**Solutions**:
- Use valid IPv4 format: `8.8.8.8`
- Check internet connection
- Wait a few minutes if rate limited
- Try a different network

### Domain Lookup Shows "No DNS records found"

**Possible Causes**:
1. Domain doesn't exist
2. Typo in domain name
3. Domain not properly configured
4. DNS resolution blocked

**Solutions**:
- Verify domain spelling (no http://)
- Try a known domain like `google.com`
- Check DNS settings: `nslookup google.com`
- Try a different DNS server

### Username Search Not Finding Accounts

**Expected Behavior**:
- Only GitHub and Reddit are actively verified
- Other platforms show as "Unknown" with links
- Manual verification needed for most platforms

**Note**: 
- ✓ Found = API verified account exists
- ✗ Not Found = API verified no account
- Unknown = No API, manual check needed

### Email Lookup Says "Invalid Format"

**Solutions**:
- Use complete email: `user@domain.com`
- No spaces or special characters
- Domain must have valid TLD (.com, .org, etc.)

### All OSINT Lookups Fail

**Network Issues**:
1. Check internet: `ping google.com`
2. Check firewall settings
3. Try different network (not corporate)
4. Disable VPN temporarily

**DNS Issues**:
```bash
# Test DNS resolution
nslookup google.com

# Try changing DNS to Google DNS
# Windows: Control Panel > Network
# Mac: System Preferences > Network
# Linux: /etc/resolv.conf
```

## AI Assistant Issues

### AI Not Responding

**Check Configuration**:

1. **For Ollama Users**:
   ```bash
   # Check if Ollama is running
   curl http://localhost:11434/api/tags
   
   # If not, start Ollama
   ollama serve
   ```

2. **For OpenAI Users**:
   - Verify API key in Settings
   - Check API key is valid
   - Check OpenAI account has credits

**Error Messages**:

"Ollama request failed":
- Start Ollama: `ollama serve`
- Install a model: `ollama pull llama2`
- Check Ollama is on port 11434

"OpenAI request failed":
- Verify API key format: `sk-...`
- Check account billing
- Try generating new API key

### AI Responds Very Slowly

**For Ollama**:
- First response is always slower (model loading)
- Larger models (70B) need more RAM
- Use smaller models: `llama2` or `mistral`

**For OpenAI**:
- Check internet speed
- Could be API rate limiting
- Try again in a few moments

### AI Gives Unhelpful Responses

**Improve Prompts**:
- Be specific: "How do I investigate a phishing email?"
- Provide context: "I'm new to OSINT"
- Ask follow-ups for clarity

**Model Selection** (Ollama):
```bash
# Try different models
ollama pull mistral      # Faster, smaller
ollama pull llama2       # Balanced
ollama pull codellama    # For technical queries
```

## UI/UX Issues

### Theme Toggle Not Working

**Solution**:
1. Clear browser localStorage
2. Refresh the app (Ctrl+R or Cmd+R)
3. Try clicking theme toggle again

### Settings Not Saving

**Problem**: localStorage issue

**Solution**:
1. Open DevTools: `npm run dev`
2. Console tab: `localStorage.clear()`
3. Reload: Ctrl+R / Cmd+R
4. Enter settings again

### Window Size Issues

**Too Small/Large**:

Edit `src/main.js`:
```javascript
mainWindow = new BrowserWindow({
    width: 1600,  // Change these
    height: 1000, // values
    // ...
});
```

### Navigation Not Working

**Symptoms**: Clicking sidebar items does nothing

**Solution**:
1. Open DevTools: `npm run dev`
2. Check Console for JavaScript errors
3. Verify `src/renderer/renderer.js` is loaded
4. Try Ctrl+R / Cmd+R to reload

## Build Issues

### "electron-builder" Errors

**Solution**:
```bash
npm install electron-builder --save-dev
npm run build
```

### Build Succeeds but App Won't Run

**Windows**:
- Check antivirus didn't quarantine
- Run installer as Administrator

**macOS**:
- Check Gatekeeper settings
- Right-click app > Open (first time)

**Linux**:
- Make AppImage executable: `chmod +x Divine-Node-UI.AppImage`
- Install dependencies: `sudo apt install libgtk-3-0`

### Missing Icons in Build

**Problem**: Icon files not found

**Temporary Solution**:
Create placeholder icons in `assets/`:
- icon.ico (Windows)
- icon.icns (macOS)  
- icon.png (Linux)

Or remove icon references from package.json

## Performance Issues

### High CPU Usage

**Possible Causes**:
- DevTools open (normal in dev mode)
- Multiple instances running
- Memory leak (restart app)

**Solutions**:
1. Use production mode: `npm start`
2. Close DevTools
3. Check Task Manager for multiple processes

### High Memory Usage

**Normal**: 200-400MB
**High**: >1GB

**Solutions**:
1. Restart application
2. Close unused modules
3. Update Electron: `npm install electron@latest`

### Slow Response Times

**OSINT Lookups**:
- Normal: Network latency
- Check internet speed
- API rate limiting (wait)

**UI Sluggish**:
1. Close other applications
2. Restart Divine Node UI
3. Check system resources

## Platform-Specific Issues

### Windows

**"Missing DLL" Errors**:
- Install Visual C++ Redistributable
- Update Windows

**Firewall Blocking**:
- Allow Divine Node UI in Windows Firewall
- Check antivirus settings

### macOS

**"App is Damaged" Error**:
```bash
xattr -cr /Applications/Divine\ Node\ UI.app
```

**Permissions Issues**:
- Grant permissions in System Preferences > Security

### Linux

**Missing Dependencies**:
```bash
# Debian/Ubuntu
sudo apt install libgtk-3-0 libnotify4 libnss3 libxss1

# Fedora
sudo dnf install gtk3 libnotify nss libXScrnSaver

# Arch
sudo pacman -S gtk3 libnotify nss
```

**AppImage Won't Run**:
```bash
chmod +x Divine-Node-UI.AppImage
sudo apt install fuse
```

## Debugging Tips

### Enable DevTools

Always run in dev mode when troubleshooting:
```bash
npm run dev
```

### Check Logs

**Console Logs**:
1. Open DevTools (F12)
2. Console tab
3. Look for red errors

**Main Process Logs**:
- Terminal/Command Prompt where you ran `npm start`

### Common Error Messages

**"Cannot read property of undefined"**:
- JavaScript error in code
- Report as bug on GitHub

**"Network request failed"**:
- Check internet connection
- Try different network
- Check firewall

**"API key invalid"**:
- Verify API key in Settings
- Regenerate API key

## Getting More Help

### Before Reporting an Issue

1. Check this troubleshooting guide
2. Search existing GitHub issues
3. Try the solutions above
4. Update to latest version

### When Reporting Issues

Include:
- Operating System and version
- Node.js version: `node --version`
- Electron version (from package.json)
- Steps to reproduce
- Error messages (full text)
- Screenshots if relevant

### Where to Get Help

1. **GitHub Issues**: https://github.com/CovertCloak06/Divine-Node-UI/issues
2. **User Guide**: `USER_GUIDE.md`
3. **Quick Start**: `QUICKSTART.md`

## Still Having Issues?

If none of these solutions work:

1. **Clean Reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

2. **Report Bug**:
   - Go to GitHub Issues
   - Provide all details listed above
   - Wait for maintainer response

3. **Rollback**:
   ```bash
   git checkout main
   npm install
   ```

---

**Remember**: Most issues are network or configuration related. Double-check your setup before reporting bugs!
