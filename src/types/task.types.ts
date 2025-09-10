import { PRIORITY_LEVELS, FILTER_TYPES } from '../config/constants';

// Task Priority Type
export type TaskPriority = typeof PRIORITY_LEVELS[keyof typeof PRIORITY_LEVELS];

// Filter Type
export type FilterType = typeof FILTER_TYPES[keyof typeof FILTER_TYPES];

// Task Interface (matches the Supabase table schema)
export interface Task {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  due_date: string | null;
  priority: TaskPriority;
  completed: boolean;
}

// Task Form Data Interface
export interface TaskFormData {
  title: string;
  description: string;
  due_date: string | null;
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