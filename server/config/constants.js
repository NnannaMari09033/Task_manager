const path = require('path');

// Application Constants
const APP_CONFIG = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATA_DIRECTORY: process.env.DATA_DIRECTORY || path.join(__dirname, '..', 'data'),
  TODOS_FILE_NAME: process.env.TODOS_FILE_NAME || 'todos.json'
};

// Security Constants
const SECURITY_CONFIG = {
  RATE_LIMIT: {
    WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },
  CORS: {
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:5173', 'http://localhost:3000']
  }
};

// Validation Constants
const VALIDATION_RULES = {
  TODO: {
    TITLE: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 200
    },
    DESCRIPTION: {
      MAX_LENGTH: 1000
    },
    PRIORITY: {
      ALLOWED_VALUES: ['low', 'medium', 'high']
    }
  }
};

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  TOO_MANY_REQUESTS: 429
};

// Response Messages
const MESSAGES = {
  SUCCESS: {
    TODOS_RETRIEVED: 'Tasks retrieved successfully',
    TODO_CREATED: 'Task created successfully',
    TODO_UPDATED: 'Task updated successfully',
    TODO_DELETED: 'Task deleted successfully',
    TODO_TOGGLED: 'Task status updated successfully',
    HEALTH_CHECK: 'API is running properly'
  },
  ERROR: {
    TODOS_FETCH_FAILED: 'Failed to retrieve tasks',
    TODO_CREATE_FAILED: 'Failed to create task',
    TODO_UPDATE_FAILED: 'Failed to update task',
    TODO_DELETE_FAILED: 'Failed to delete task',
    TODO_TOGGLE_FAILED: 'Failed to update task status',
    TODO_NOT_FOUND: 'Task not found',
    TITLE_REQUIRED: 'Task title is required',
    INVALID_PRIORITY: 'Invalid priority level',
    INVALID_INPUT: 'Invalid input data',
    INTERNAL_ERROR: 'Internal server error',
    ENDPOINT_NOT_FOUND: 'API endpoint not found',
    RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later.'
  }
};

module.exports = {
  APP_CONFIG,
  SECURITY_CONFIG,
  VALIDATION_RULES,
  HTTP_STATUS,
  MESSAGES
};