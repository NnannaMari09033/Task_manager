# Todo Backend API

A simple Express.js backend for the Todo List application.

## Features

- RESTful API endpoints for todo management
- JSON file-based data storage
- CORS enabled for frontend integration
- Input validation and error handling
- Sample data initialization

## API Endpoints

### GET /api/todos
Get all todos

### POST /api/todos
Create a new todo
```json
{
  "title": "Todo title",
  "description": "Optional description",
  "dueDate": "2024-02-15T00:00:00.000Z",
  "priority": "high|medium|low"
}
```

### PUT /api/todos/:id
Update a todo

### DELETE /api/todos/:id
Delete a todo

### PATCH /api/todos/:id/toggle
Toggle todo completion status

### GET /api/health
Health check endpoint

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## Data Storage

Todos are stored in `server/data/todos.json`. The file is automatically created with sample data on first run.

## CORS

CORS is enabled to allow requests from the frontend application running on different ports.