# Contributing to Divine Node UI

Thank you for your interest in contributing to Divine Node UI! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment
- Follow ethical OSINT practices

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported
2. Open a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - System information (OS, Node version)
   - Screenshots if applicable

### Suggesting Features

1. Check existing issues for similar suggestions
2. Open a new issue describing:
   - The feature and its benefits
   - Possible implementation approach
   - Any potential challenges

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Divine-Node-UI.git

# Install dependencies
npm install

# Run in development mode
npm run dev
```

## Code Style

- Use meaningful variable names
- Add comments for complex logic
- Follow existing code patterns
- Keep functions focused and small
- Use consistent formatting

## Testing

Before submitting:
1. Test all OSINT modules
2. Verify UI works on your platform
3. Check theme switching
4. Test with and without AI configured
5. Ensure no console errors

## OSINT Module Guidelines

When adding new OSINT modules:

1. **Ethical Considerations**
   - Only use public data sources
   - Respect rate limits
   - Don't enable illegal activities
   - Include appropriate warnings

2. **API Usage**
   - Prefer free, public APIs
   - Provide fallback options
   - Handle errors gracefully
   - Document API requirements

3. **User Experience**
   - Clear input validation
   - Helpful error messages
   - Loading indicators
   - Result formatting

## Project Structure

```
Divine-Node-UI/
├── src/
│   ├── main.js              # Electron main process
│   ├── renderer/            # UI files
│   │   ├── index.html       # Main HTML
│   │   ├── styles.css       # Styling
│   │   └── renderer.js      # Frontend logic
│   ├── osint/              # OSINT modules
│   │   ├── ip-lookup.js
│   │   ├── domain-lookup.js
│   │   ├── username-search.js
│   │   └── email-lookup.js
│   └── ai/                 # AI integration
│       └── processor.js
├── assets/                 # Icons and images
├── package.json
└── README.md
```

## Adding New OSINT Modules

1. **Create Module File**
   ```javascript
   // src/osint/your-module.js
   async function performYourLookup(input) {
       // Implementation
       return result;
   }
   module.exports = { performYourLookup };
   ```

2. **Add IPC Handler** (in main.js)
   ```javascript
   ipcMain.handle('osint:your-lookup', async (event, input) => {
       const { performYourLookup } = require('./osint/your-module');
       return await performYourLookup(input);
   });
   ```

3. **Add UI** (in index.html)
   - Add navigation item
   - Create module section
   - Add input and results area

4. **Add Frontend Logic** (in renderer.js)
   ```javascript
   async function performYourLookup() {
       const result = await ipcRenderer.invoke('osint:your-lookup', input);
       // Display results
   }
   ```

## Documentation

When adding features:
- Update README.md
- Update USER_GUIDE.md if needed
- Add inline code comments
- Document any new dependencies

## Commit Messages

Use clear, descriptive commit messages:

```
Good:
- "Add phone number lookup module"
- "Fix IP lookup error handling"
- "Update README with new features"

Avoid:
- "Update"
- "Fix bug"
- "Changes"
```

## Security

- Never commit API keys or secrets
- Validate all user inputs
- Use HTTPS for external requests
- Follow security best practices
- Report security issues privately

## Questions?

- Open an issue for general questions
- Tag maintainers for urgent issues
- Check existing issues first

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Divine Node UI! 🙏
