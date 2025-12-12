# Divine-Node-UI
Custom Interface for my AI/OSINT tool

## Features

- **Project Import from Phone Directory**: Import projects directly from your phone's `/sdcard/pkn` directory
- Browse and select projects from the specified directory
- View project contents and file structure
- Clean, responsive web interface

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

## Usage

### Starting the Server

```bash
npm start
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

### Accessing the UI

Open your browser and navigate to:
```
http://localhost:3000
```

### Importing Projects

1. Enter the directory path (default: `/sdcard/pkn`)
2. Click "Browse Projects" to list all available projects in that directory
3. Click on any project to import and view its contents

## API Endpoints

### GET `/api/projects`
List all projects in a directory.

**Query Parameters:**
- `path` (optional): Directory path to scan (default: `/sdcard/pkn`)

**Response:**
```json
{
  "projects": [
    {
      "name": "project-name",
      "path": "/sdcard/pkn/project-name"
    }
  ],
  "directory": "/sdcard/pkn"
}
```

### POST `/api/import`
Import a specific project.

**Request Body:**
```json
{
  "projectPath": "/sdcard/pkn/project-name"
}
```

**Response:**
```json
{
  "success": true,
  "projectPath": "/sdcard/pkn/project-name",
  "files": [
    {
      "name": "file.txt",
      "path": "/sdcard/pkn/project-name/file.txt",
      "type": "file",
      "content": "..."
    }
  ]
}
```

## Configuration

- **Default Project Directory**: `/sdcard/pkn`
- **Server Port**: 3000 (configurable via PORT environment variable)

## License

MIT
