import { Task, TaskPriority, FilterType, TaskStatistics, TaskFormData } from '../types/task.types';
import { PRIORITY_LEVELS, FILTER_TYPES } from '../config/constants';

/**
 * Formats a priority level for display
 */
export const formatPriority = (priority: TaskPriority): string => {
  switch (priority) {
    case PRIORITY_LEVELS.LOW:
      return 'Low';
    case PRIORITY_LEVELS.MEDIUM:
      return 'Medium';
    case PRIORITY_LEVELS.HIGH:
      return 'High';
    default:
      return 'Medium';
  }
};

/**
 * Formats a date for display
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Formats a due date with context (overdue, due today, etc.)
 */
export const formatDueDate = (dueDate: Date | string | null): string => {
  if (!dueDate) return '';
  
  const today = new Date();
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  
  // Reset time to compare dates only
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  
  if (due.getTime() === today.getTime()) {
    return 'Due today';
  } else if (due < today) {
    return 'Overdue';
  } else {
    return `Due ${formatDate(due)}`;
  }
};

/**
 * Checks if a task is overdue
 */
export const isTaskOverdue = (task: Task): boolean => {
  if (!task.dueDate || task.completed) return false;
  
  const today = new Date();
  const dueDate = typeof task.dueDate === 'string' ? new Date(task.dueDate) : task.dueDate;
  
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  
  return dueDate < today;
};

/**
 * Filters tasks based on filter type and search query
 */
export const filterTasks = (
  tasks: Task[],
  filter: FilterType,
  searchQuery: string
): Task[] => {
  let filtered = [...tasks];

  // Apply filter
  switch (filter) {
    case FILTER_TYPES.ACTIVE:
      filtered = filtered.filter(task => !task.completed);
      break;
    case FILTER_TYPES.COMPLETED:
      filtered = filtered.filter(task => task.completed);
      break;
    default:
      // Show all tasks
      break;
  }

  // Apply search
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(query) ||
      (task.description && task.description.toLowerCase().includes(query))
    );
  }

  return filtered;
};

/**
 * Sorts tasks by priority and due date
 */
export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // First, sort by completion status (incomplete tasks first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // Then by priority (high to low)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;

    // Then by due date (earliest first, null dates last)
    if (a.dueDate && b.dueDate) {
      const dateA = typeof a.dueDate === 'string' ? new Date(a.dueDate) : a.dueDate;
      const dateB = typeof b.dueDate === 'string' ? new Date(b.dueDate) : b.dueDate;
      return dateA.getTime() - dateB.getTime();
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;

    // Finally by creation date (newest first)
    const createdA = typeof a.createdAt === 'string' ? new Date(a.createdAt) : a.createdAt;
    const createdB = typeof b.createdAt === 'string' ? new Date(b.createdAt) : b.createdAt;
    return createdB.getTime() - createdA.getTime();
  });
};

/**
 * Calculates task statistics
 */
export const calculateTaskStatistics = (tasks: Task[]): TaskStatistics => {
  const stats: TaskStatistics = {
    total: tasks.length,
    active: 0,
    completed: 0,
    overdue: 0,
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0
  };

  tasks.forEach(task => {
    // Completion status
    if (task.completed) {
      stats.completed++;
    } else {
      stats.active++;
    }

    // Overdue tasks
    if (isTaskOverdue(task)) {
      stats.overdue++;
    }

    // Priority distribution
    switch (task.priority) {
      case PRIORITY_LEVELS.HIGH:
        stats.highPriority++;
        break;
      case PRIORITY_LEVELS.MEDIUM:
        stats.mediumPriority++;
        break;
      case PRIORITY_LEVELS.LOW:
        stats.lowPriority++;
        break;
    }
  });

  return stats;
};

/**
 * Validates task form data
 */
export const validateTaskForm = (formData: Partial<TaskFormData>): string[] => {
  const errors: string[] = [];

  if (!formData.title || formData.title.trim().length === 0) {
    errors.push('Task title is required');
  }

  if (formData.title && formData.title.trim().length > 200) {
    errors.push('Task title cannot exceed 200 characters');
  }

  if (formData.description && formData.description.length > 1000) {
    errors.push('Task description cannot exceed 1000 characters');
  }

  if (formData.priority && !Object.values(PRIORITY_LEVELS).includes(formData.priority)) {
    errors.push('Invalid priority level');
  }

  return errors;
};