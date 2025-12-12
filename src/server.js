const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Security: Validate and sanitize paths to prevent directory traversal
function validatePath(userPath) {
  // Resolve the path to prevent directory traversal
  const resolvedPath = path.resolve(userPath);
  
  // Check if path contains suspicious patterns
  if (userPath.includes('..') || userPath.includes('~')) {
    throw new Error('Invalid path: directory traversal detected');
  }
  
  return resolvedPath;
}

// API endpoint to list projects from a directory
app.get('/api/projects', async (req, res) => {
  const projectDir = req.query.path || '/sdcard/pkn';
  
  try {
    // Validate and sanitize path
    const validatedPath = validatePath(projectDir);
    
    const exists = await fs.access(validatedPath).then(() => true).catch(() => false);
    
    if (!exists) {
      return res.status(404).json({ 
        error: 'Directory not found',
        message: `The directory ${projectDir} does not exist` 
      });
    }
    
    const files = await fs.readdir(validatedPath, { withFileTypes: true });
    const projects = files
      .filter(file => file.isDirectory())
      .map(dir => ({
        name: dir.name,
        path: path.join(validatedPath, dir.name)
      }));
    
    res.json({ projects, directory: validatedPath });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to read directory',
      message: error.message 
    });
  }
});

// API endpoint to import a specific project
app.post('/api/import', async (req, res) => {
  const { projectPath } = req.body;
  
  if (!projectPath) {
    return res.status(400).json({ error: 'Project path is required' });
  }
  
  try {
    // Validate and sanitize path
    const validatedPath = validatePath(projectPath);
    
    const exists = await fs.access(validatedPath).then(() => true).catch(() => false);
    
    if (!exists) {
      return res.status(404).json({ 
        error: 'Project not found',
        message: `The project at ${projectPath} does not exist` 
      });
    }
    
    // Read project files
    const files = await fs.readdir(validatedPath, { withFileTypes: true });
    const projectFiles = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(validatedPath, file.name);
        if (file.isFile()) {
          try {
            // Only attempt to read text files, limit size for security
            const stats = await fs.stat(filePath);
            const maxSize = 1024 * 1024; // 1MB limit
            
            if (stats.size > maxSize) {
              return {
                name: file.name,
                path: filePath,
                type: 'file',
                error: 'File too large to display'
              };
            }
            
            // Try to read as text, catch encoding errors
            const content = await fs.readFile(filePath, 'utf-8').catch(() => null);
            
            if (content === null) {
              return {
                name: file.name,
                path: filePath,
                type: 'file',
                error: 'Binary file or encoding error'
              };
            }
            
            return {
              name: file.name,
              path: filePath,
              type: 'file',
              content: content
            };
          } catch (err) {
            return {
              name: file.name,
              path: filePath,
              type: 'file',
              error: 'Could not read file'
            };
          }
        } else if (file.isDirectory()) {
          return {
            name: file.name,
            path: filePath,
            type: 'directory'
          };
        }
      })
    );
    
    res.json({ 
      success: true,
      projectPath: validatedPath,
      files: projectFiles.filter(f => f !== undefined)
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to import project',
      message: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Divine Node UI server running on port ${PORT}`);
  console.log(`Access the UI at http://localhost:${PORT}`);
});
