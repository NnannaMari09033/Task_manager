import { PRIORITY_LEVELS, FILTER_TYPES } from '../config/constants';

// Task Priority Type
export type TaskPriority = typeof PRIORITY_LEVELS[keyof typeof PRIORITY_LEVELS];

// Filter Type
export type FilterType = typeof FILTER_TYPES[keyof typeof FILTER_TYPES];

// Task Interface
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date | string | null;
  priority: TaskPriority;
  completed: boolean;
  createdAt: Date | string;
}

// Task Form Data Interface
export interface TaskFormData {
  title: string;
  description: string;
  dueDate: Date | null;
  priority: TaskPriority;
}

// Task State Interface
export interface TaskState {
  tasks: Task[];
  filter: FilterType;
  searchQuery: string;
  themeMode: 'light' | 'dark';
  loading: boolean;
  error: string | null;
}

// Task Form State Interface
export interface TaskFormState {
  isOpen: boolean;
  editingTask: Task | null;
  formData: TaskFormData;
}

// API Response Interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  errors?: string[];
}

// Task Statistics Interface
export interface TaskStatistics {
  total: number;
  active: number;
  completed: number;
  overdue: number;
  highPriority: number;
  mediumPriority: number;
  lowPriority: number;
}