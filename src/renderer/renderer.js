const { ipcRenderer } = require('electron');

// Module Navigation
const navItems = document.querySelectorAll('.nav-item');
const modules = document.querySelectorAll('.module');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const moduleName = item.getAttribute('data-module');
        navigateToModule(moduleName);
    });
});

function navigateToModule(moduleName) {
    // Update active nav item
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-module') === moduleName) {
            item.classList.add('active');
        }
    });

    // Show corresponding module
    modules.forEach(module => {
        module.classList.remove('active');
        if (module.id === moduleName) {
            module.classList.add('active');
        }
    });
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
let isDarkTheme = true;

themeToggle.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('light-theme');
    themeToggle.textContent = isDarkTheme ? '🌙 Dark Mode' : '☀️ Light Mode';
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    themeToggle.click();
}

// IP Lookup Function
async function performIPLookup() {
    const ipInput = document.getElementById('ip-input');
    const resultsDiv = document.getElementById('ip-results');
    const ip = ipInput.value.trim();

    if (!ip) {
        resultsDiv.innerHTML = '<div class="error">Please enter an IP address</div>';
        return;
    }

    resultsDiv.innerHTML = '<div class="loading">Looking up IP address</div>';

    try {
        const result = await ipcRenderer.invoke('osint:ip-lookup', ip);
        
        if (result.error) {
            resultsDiv.innerHTML = `<div class="error">${result.error}</div>`;
            return;
        }

        resultsDiv.innerHTML = `
            <div class="result-item">
                <h4>IP Address Information</h4>
                <p><strong>IP:</strong> ${result.ip}</p>
                <p><strong>Country:</strong> ${result.country || 'N/A'}</p>
                <p><strong>Region:</strong> ${result.region || 'N/A'}</p>
                <p><strong>City:</strong> ${result.city || 'N/A'}</p>
                <p><strong>ISP:</strong> ${result.isp || 'N/A'}</p>
                <p><strong>Organization:</strong> ${result.org || 'N/A'}</p>
                <p><strong>Timezone:</strong> ${result.timezone || 'N/A'}</p>
                <p><strong>Latitude:</strong> ${result.latitude || 'N/A'}</p>
                <p><strong>Longitude:</strong> ${result.longitude || 'N/A'}</p>
            </div>
        `;
    } catch (error) {
        resultsDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

// Domain Lookup Function
async function performDomainLookup() {
    const domainInput = document.getElementById('domain-input');
    const resultsDiv = document.getElementById('domain-results');
    const domain = domainInput.value.trim();

    if (!domain) {
        resultsDiv.innerHTML = '<div class="error">Please enter a domain name</div>';
        return;
    }

    resultsDiv.innerHTML = '<div class="loading">Looking up domain information</div>';

    try {
        const result = await ipcRenderer.invoke('osint:domain-lookup', domain);
        
        if (result.error) {
            resultsDiv.innerHTML = `<div class="error">${result.error}</div>`;
            return;
        }

        resultsDiv.innerHTML = `
            <div class="result-item">
                <h4>Domain Information</h4>
                <p><strong>Domain:</strong> ${result.domain}</p>
                <p><strong>Registrar:</strong> ${result.registrar || 'N/A'}</p>
                <p><strong>Created Date:</strong> ${result.created || 'N/A'}</p>
                <p><strong>Expires:</strong> ${result.expires || 'N/A'}</p>
                <p><strong>Updated:</strong> ${result.updated || 'N/A'}</p>
                <p><strong>Status:</strong> ${result.status || 'N/A'}</p>
            </div>
            ${result.dns ? `
            <div class="result-item">
                <h4>DNS Records</h4>
                <p><strong>A Records:</strong> ${result.dns.A ? result.dns.A.join(', ') : 'N/A'}</p>
                <p><strong>MX Records:</strong> ${result.dns.MX ? result.dns.MX.join(', ') : 'N/A'}</p>
                <p><strong>NS Records:</strong> ${result.dns.NS ? result.dns.NS.join(', ') : 'N/A'}</p>
            </div>
            ` : ''}
        `;
    } catch (error) {
        resultsDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

// Username Search Function
async function performUsernameSearch() {
    const usernameInput = document.getElementById('username-input');
    const resultsDiv = document.getElementById('username-results');
    const username = usernameInput.value.trim();

    if (!username) {
        resultsDiv.innerHTML = '<div class="error">Please enter a username</div>';
        return;
    }

    resultsDiv.innerHTML = '<div class="loading">Searching for username across platforms</div>';

    try {
        const result = await ipcRenderer.invoke('osint:username-search', username);
        
        if (result.error) {
            resultsDiv.innerHTML = `<div class="error">${result.error}</div>`;
            return;
        }

        let platformsHTML = '<div class="result-grid">';
        result.platforms.forEach(platform => {
            const badgeClass = platform.found ? 'found' : 'not-found';
            const status = platform.found ? '✓ Found' : '✗ Not Found';
            platformsHTML += `
                <div class="result-item">
                    <h4>${platform.name}</h4>
                    <span class="platform-badge ${badgeClass}">${status}</span>
                    ${platform.url ? `<p><a href="${platform.url}" target="_blank" style="color: var(--accent-color);">${platform.url}</a></p>` : ''}
                </div>
            `;
        });
        platformsHTML += '</div>';

        resultsDiv.innerHTML = `
            <div class="result-item">
                <h4>Username Search Results for: ${username}</h4>
                <p>Found on ${result.foundCount} out of ${result.totalChecked} platforms</p>
            </div>
            ${platformsHTML}
        `;
    } catch (error) {
        resultsDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

// Email Lookup Function
async function performEmailLookup() {
    const emailInput = document.getElementById('email-input');
    const resultsDiv = document.getElementById('email-results');
    const email = emailInput.value.trim();

    if (!email) {
        resultsDiv.innerHTML = '<div class="error">Please enter an email address</div>';
        return;
    }

    resultsDiv.innerHTML = '<div class="loading">Validating email address</div>';

    try {
        const result = await ipcRenderer.invoke('osint:email-lookup', email);
        
        if (result.error) {
            resultsDiv.innerHTML = `<div class="error">${result.error}</div>`;
            return;
        }

        resultsDiv.innerHTML = `
            <div class="result-item">
                <h4>Email Validation Results</h4>
                <p><strong>Email:</strong> ${result.email}</p>
                <p><strong>Valid Format:</strong> ${result.valid ? '✓ Yes' : '✗ No'}</p>
                <p><strong>Domain:</strong> ${result.domain || 'N/A'}</p>
                <p><strong>Provider:</strong> ${result.provider || 'N/A'}</p>
                <p><strong>Disposable:</strong> ${result.disposable ? '⚠ Yes' : '✓ No'}</p>
            </div>
        `;
    } catch (error) {
        resultsDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

// AI Assistant Function
async function sendAIQuery() {
    const aiInput = document.getElementById('ai-input');
    const messagesDiv = document.getElementById('chat-messages');
    const query = aiInput.value.trim();

    if (!query) {
        return;
    }

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.textContent = query;
    messagesDiv.appendChild(userMessage);

    // Clear input
    aiInput.value = '';

    // Add loading message
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'chat-message assistant loading';
    loadingMessage.textContent = 'Thinking';
    messagesDiv.appendChild(loadingMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    try {
        // Get settings from localStorage
        const context = {
            openaiKey: localStorage.getItem('openai-key'),
            ollamaUrl: localStorage.getItem('ollama-url') || 'http://localhost:11434'
        };
        
        const result = await ipcRenderer.invoke('ai:query', query, context);
        
        // Remove loading message
        messagesDiv.removeChild(loadingMessage);

        // Add AI response
        const aiMessage = document.createElement('div');
        aiMessage.className = 'chat-message assistant';
        aiMessage.textContent = result.response || 'Sorry, I could not generate a response.';
        messagesDiv.appendChild(aiMessage);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } catch (error) {
        messagesDiv.removeChild(loadingMessage);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'chat-message assistant error';
        errorMessage.textContent = `Error: ${error.message}`;
        messagesDiv.appendChild(errorMessage);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}

// Allow Enter key to submit in AI chat
document.getElementById('ai-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendAIQuery();
    }
});

// Settings Functions
function saveSettings() {
    const openaiKey = document.getElementById('openai-key').value;
    const ollamaUrl = document.getElementById('ollama-url').value;

    localStorage.setItem('openai-key', openaiKey);
    localStorage.setItem('ollama-url', ollamaUrl);

    // Show success message
    const settingsContainer = document.querySelector('.settings-container');
    const successMsg = document.createElement('div');
    successMsg.className = 'success';
    successMsg.textContent = 'Settings saved successfully!';
    settingsContainer.insertBefore(successMsg, settingsContainer.firstChild);

    setTimeout(() => {
        successMsg.remove();
    }, 3000);
}

// Load saved settings
function loadSettings() {
    const openaiKey = localStorage.getItem('openai-key');
    const ollamaUrl = localStorage.getItem('ollama-url');

    if (openaiKey) {
        document.getElementById('openai-key').value = openaiKey;
    }
    if (ollamaUrl) {
        document.getElementById('ollama-url').value = ollamaUrl;
    }
}

// Initialize settings on load
loadSettings();

// Allow Enter key for all search inputs
document.getElementById('ip-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performIPLookup();
});

document.getElementById('domain-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performDomainLookup();
});

document.getElementById('username-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performUsernameSearch();
});

document.getElementById('email-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performEmailLookup();
});

console.log('Divine Node UI Renderer Initialized');
