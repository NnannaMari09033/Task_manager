import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskState, TaskFormData, FilterType } from '../types/task.types';
import { FILTER_TYPES } from '../config/constants';
import { taskService } from '../services/taskService';

// The initial state now attempts to load tasks from localStorage.
const initialState: TaskState = {
  tasks: [], // This will be populated by fetchTasks on app load
  filter: FILTER_TYPES.ALL,
  searchQuery: '',
  themeMode: 'light',
  loading: true, // Start with loading true until tasks are fetched
  error: null
};

// Async thunks now interact with the localStorage service.
// They are still "async" to keep the component logic consistent.
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await taskService.getAllTasks();
      return tasks;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch tasks';
      return rejectWithValue(message);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: TaskFormData, { rejectWithValue }) => {
    try {
      const newTask = await taskService.createTask(taskData);
      return newTask;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create task';
      return rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }: { id: string; updates: Partial<TaskFormData> }, { rejectWithValue }) => {
    try {
      const updatedTask = await taskService.updateTask(id, updates);
      return updatedTask;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update task';
      return rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      await taskService.deleteTask(id);
      return id;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete task';
      return rejectWithValue(message);
    }
  }
);

export const toggleTaskCompletion = createAsyncThunk(
  'tasks/toggleTaskCompletion',
  async (id: string, { rejectWithValue }) => {
    try {
      const updatedTask = await taskService.toggleTaskCompletion(id);
      return updatedTask;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to toggle task completion';
      return rejectWithValue(message);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleThemeMode: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Since localStorage operations are very fast, we can simplify the state handling.
    // We no longer need a 'loading' state for most operations, only for the initial fetch.
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create task
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Update task
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Delete task
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Toggle task completion
      .addCase(toggleTaskCompletion.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(toggleTaskCompletion.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilter,
  setSearchQuery,
  toggleThemeMode,
  clearError
} = taskSlice.actions;

export default taskSlice.reducer;
