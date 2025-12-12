// UI State
let currentProjects = [];
let selectedProject = null;

// Utility functions
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    successDiv.style.display = 'none';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    const errorDiv = document.getElementById('errorMessage');
    
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 5000);
}

function hideMessages() {
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
}

// Load projects from the specified directory
async function loadProjects() {
    const pathInput = document.getElementById('projectPath');
    const projectPath = pathInput.value || '/sdcard/pkn';
    const projectListDiv = document.getElementById('projectList');
    const projectsContainer = document.getElementById('projectsContainer');
    const detailsDiv = document.getElementById('projectDetails');
    
    hideMessages();
    projectsContainer.innerHTML = '<div class="loading">Loading projects</div>';
    projectListDiv.style.display = 'block';
    detailsDiv.style.display = 'none';
    
    try {
        const response = await fetch(`/api/projects?path=${encodeURIComponent(projectPath)}`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to load projects');
        }
        
        currentProjects = data.projects || [];
        
        if (currentProjects.length === 0) {
            projectsContainer.innerHTML = '<p style="color: #666;">No projects found in this directory.</p>';
            return;
        }
        
        projectsContainer.innerHTML = currentProjects.map(project => `
            <div class="project-item" onclick="importProject('${escapeHtml(project.path)}')">
                <h4>${escapeHtml(project.name)}</h4>
                <p>${escapeHtml(project.path)}</p>
            </div>
        `).join('');
        
        showSuccess(`Found ${currentProjects.length} project(s) in ${data.directory}`);
        
    } catch (error) {
        projectsContainer.innerHTML = '';
        projectListDiv.style.display = 'none';
        showError(error.message);
    }
}

// Import a specific project
async function importProject(projectPath) {
    const detailsDiv = document.getElementById('projectDetails');
    const detailsContainer = document.getElementById('detailsContainer');
    
    hideMessages();
    detailsContainer.innerHTML = '<div class="loading">Importing project</div>';
    detailsDiv.style.display = 'block';
    
    try {
        const response = await fetch('/api/import', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ projectPath })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to import project');
        }
        
        selectedProject = data;
        displayProjectDetails(data);
        showSuccess(`Successfully imported project from ${projectPath}`);
        
    } catch (error) {
        detailsContainer.innerHTML = '';
        detailsDiv.style.display = 'none';
        showError(error.message);
    }
}

// Display project details
function displayProjectDetails(project) {
    const detailsContainer = document.getElementById('detailsContainer');
    
    const files = project.files || [];
    const fileList = files.map(file => {
        const typeLabel = file.type === 'directory' ? 'DIR' : 'FILE';
        const errorLabel = file.error ? ' (Error)' : '';
        return `
            <div class="file-item">
                <span class="file-name">${escapeHtml(file.name)}${errorLabel}</span>
                <span class="file-type">${typeLabel}</span>
            </div>
        `;
    }).join('');
    
    detailsContainer.innerHTML = `
        <div style="margin-bottom: 15px;">
            <strong>Project Path:</strong> ${escapeHtml(project.projectPath)}
        </div>
        <div style="margin-bottom: 15px;">
            <strong>Files Found:</strong> ${files.length}
        </div>
        <div>
            <h4 style="margin-bottom: 10px;">Project Contents:</h4>
            ${fileList || '<p>No files found</p>'}
        </div>
    `;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Allow Enter key to trigger load
    document.getElementById('projectPath').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loadProjects();
        }
    });
});
