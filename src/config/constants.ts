// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000 // 1 second
} as const;

// Application Constants
export const APP_CONSTANTS = {
  STORAGE_KEYS: {
    THEME_MODE: 'taskApp_themeMode',
    USER_PREFERENCES: 'taskApp_userPreferences'
  },
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 300
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  TASK: {
    TITLE: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 200
    },
    DESCRIPTION: {
      MAX_LENGTH: 1000
    }
  }
} as const;

// UI Messages
export const UI_MESSAGES = {
  SUCCESS: {
    TASK_CREATED: 'Task created successfully',
    TASK_UPDATED: 'Task updated successfully',
    TASK_DELETED: 'Task deleted successfully',
    TASK_COMPLETED: 'Task marked as completed',
    TASK_UNCOMPLETED: 'Task marked as active'
  },
  ERROR: {
    NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
    SERVER_ERROR: 'Server error occurred. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    TASK_NOT_FOUND: 'Task not found.',
    GENERIC_ERROR: 'Something went wrong. Please try again.'
  },
  LOADING: {
    FETCHING_TASKS: 'Loading tasks...',
    SAVING_TASK: 'Saving task...',
    DELETING_TASK: 'Deleting task...',
    UPDATING_TASK: 'Updating task...'
  },
  EMPTY_STATES: {
    NO_TASKS: 'No tasks found',
    NO_ACTIVE_TASKS: 'No active tasks',
    NO_COMPLETED_TASKS: 'No completed tasks',
    NO_SEARCH_RESULTS: 'No tasks match your search',
    GET_STARTED: 'Add your first task and start your journey to productivity!'
  }
} as const;

// Priority Levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const;

// Filter Types
export const FILTER_TYPES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
} as const;