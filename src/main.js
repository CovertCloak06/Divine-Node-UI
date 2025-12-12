const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    backgroundColor: '#1a1a1a',
    icon: path.join(__dirname, '../assets/icon.png'),
    show: false
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  // Show window when ready to prevent flashing
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open DevTools in development mode
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App lifecycle
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for OSINT modules
ipcMain.handle('osint:ip-lookup', async (event, ip) => {
  const { performIPLookup } = require('./osint/ip-lookup');
  return await performIPLookup(ip);
});

ipcMain.handle('osint:domain-lookup', async (event, domain) => {
  const { performDomainLookup } = require('./osint/domain-lookup');
  return await performDomainLookup(domain);
});

ipcMain.handle('osint:username-search', async (event, username) => {
  const { performUsernameSearch } = require('./osint/username-search');
  return await performUsernameSearch(username);
});

ipcMain.handle('osint:email-lookup', async (event, email) => {
  const { performEmailLookup } = require('./osint/email-lookup');
  return await performEmailLookup(email);
});

ipcMain.handle('ai:query', async (event, query, context) => {
  const { processAIQuery } = require('./ai/processor');
  return await processAIQuery(query, context);
});

console.log('Divine Node UI - OSINT & AI Assistant Started');
