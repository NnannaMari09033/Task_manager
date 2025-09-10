import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  CssBaseline,
  ThemeProvider,
  Fab,
  Box,
  Alert,
  Snackbar,
  CircularProgress,
  Backdrop
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { store, RootState } from '../store/store';
import { createTheme } from '@mui/material/styles';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  setFilter,
  setSearchQuery,
  toggleThemeMode,
  clearError
} from '../store/taskSlice';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDebounce } from '../hooks/useDebounce';
import { Task, TaskFormData, FilterType } from '../types/task.types';
import { FILTER_TYPES, APP_CONSTANTS, UI_MESSAGES } from '../config/constants';
import { filterTasks, calculateTaskStatistics } from '../utils/taskUtils';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import FilterBar from './FilterBar';
import ThemeToggle from './ThemeToggle';
import baseTheme from '../theme/theme';

const TaskAppContent: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, filter, searchQuery, themeMode, loading, error } = useSelector((state: RootState) => state.tasks);
  
  // Create theme with current mode
  const theme = React.useMemo(() => 
    createTheme({
      ...baseTheme,
      palette: {
        mode: themeMode,
        ...baseTheme.colorSchemes?.[themeMode]?.palette
      }
    }), [themeMode]
  );
  const [storedThemeMode, setStoredThemeMode] = useLocalStorage<'light' | 'dark'>(
    APP_CONSTANTS.STORAGE_KEYS.THEME_MODE, 
    'light'
  );
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>('online');

  // Debounce search query for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, APP_CONSTANTS.DEBOUNCE_DELAY);

  // Initialize data from API and theme from localStorage
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await dispatch(fetchTasks() as any).unwrap();
        setConnectionStatus('online');
      } catch (error) {
        setConnectionStatus('offline');
        console.error('Failed to initialize app:', error);
      }
    };
    
    initializeApp();
    
    if (storedThemeMode !== themeMode) {
      dispatch(toggleThemeMode());
    }
  }, [dispatch, storedThemeMode, themeMode]);

  // Save theme mode to localStorage
  useEffect(() => {
    setStoredThemeMode(themeMode);
  }, [themeMode, setStoredThemeMode]);

  // Show error snackbar when error occurs
  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  // Filter and search tasks with debounced search query
  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, filter, debouncedSearchQuery);
  }, [tasks, filter, debouncedSearchQuery]);

  // Calculate task statistics
  const taskStatistics = useMemo(() => {
    return calculateTaskStatistics(tasks);
  }, [tasks]);

  const handleAddTask = React.useCallback(() => {
    setEditingTask(null);
    setFormOpen(true);
  }, []);

  const handleEditTask = React.useCallback((task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  }, []);

  const handleFormSubmit = async (formData: TaskFormData) => {
    try {
      if (editingTask) {
        await dispatch(updateTask({
          id: editingTask.id,
          updates: formData
        }) as any).unwrap();
      } else {
        await dispatch(createTask(formData) as any).unwrap();
      }
    } catch (error) {
      // Error is handled by Redux and will show in snackbar
      console.error('Form submission error:', error);
    }
  };

  const handleDeleteTask = React.useCallback(async (id: string) => {
    try {
      await dispatch(deleteTask(id) as any).unwrap();
    } catch (error) {
      console.error('Delete task error:', error);
    }
  }, [dispatch]);

  const handleToggleComplete = React.useCallback(async (id: string) => {
    try {
      await dispatch(toggleTaskCompletion(id) as any).unwrap();
    } catch (error) {
      console.error('Toggle completion error:', error);
    }
  }, [dispatch]);

  const handleFilterChange = React.useCallback((newFilter: FilterType) => {
    dispatch(setFilter(newFilter));
  }, [dispatch]);

  const handleSearchChange = React.useCallback((query: string) => {
    dispatch(setSearchQuery(query));
  }, [dispatch]);

  const handleThemeToggle = React.useCallback(() => {
    dispatch(toggleThemeMode());
  }, [dispatch]);

  const handleCloseSnackbar = React.useCallback(() => {
    setSnackbarOpen(false);
    dispatch(clearError());
  }, [dispatch]);

  const getEmptyMessage = () => {
    switch (filter) {
      case FILTER_TYPES.ACTIVE:
        return UI_MESSAGES.EMPTY_STATES.NO_ACTIVE_TASKS;
      case FILTER_TYPES.COMPLETED:
        return UI_MESSAGES.EMPTY_STATES.NO_COMPLETED_TASKS;
      default:
        return debouncedSearchQuery.trim() 
          ? UI_MESSAGES.EMPTY_STATES.NO_SEARCH_RESULTS 
          : UI_MESSAGES.EMPTY_STATES.NO_TASKS;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: (theme) => theme.palette.mode === 'light' 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
          position: 'relative',
          transition: 'background 0.3s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: (theme) => theme.palette.mode === 'light'
              ? 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)'
              : 'radial-gradient(circle at 20% 80%, rgba(30, 58, 138, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.4) 0%, transparent 50%)',
            pointerEvents: 'none',
            transition: 'background 0.3s ease'
          }
        }}
      >
        <AppBar 
          position="static" 
          elevation={0}
        >
          <Toolbar sx={{ py: 1 }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 700,
                color: 'white',
                fontSize: '1.5rem'
              }}
            >
              ✨ Task Manager
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              {connectionStatus === 'offline' && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'error.main',
                    fontWeight: 600,
                    background: 'rgba(239, 68, 68, 0.1)',
                    px: 1,
                    py: 0.5,
                    borderRadius: '8px'
                  }}
                >
                  Offline
                </Typography>
              )}
              <ThemeToggle themeMode={themeMode} onToggle={handleThemeToggle} />
            </Stack>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography 
                variant="h4" 
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  fontSize: { xs: '2rem', sm: '2.5rem' }
                }}
              >
                My Tasks ✨
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddOutlinedIcon />}
                onClick={handleAddTask}
                disabled={loading}
                sx={{ 
                  display: { xs: 'none', sm: 'flex' },
                  background: 'linear-gradient(45deg, #6366f1, #ec4899)',
                  borderRadius: '16px',
                  px: 3,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 32px 0 rgba(99, 102, 241, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #4f46e5, #db2777)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px 0 rgba(99, 102, 241, 0.6)'
                  },
                  '&:disabled': {
                    opacity: 0.6,
                    transform: 'none'
                  }
                }}
                aria-label="Add new task"
              >
                Add Task
              </Button>
            </Stack>

            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              currentFilter={filter}
              onFilterChange={handleFilterChange}
              taskCounts={{
                all: taskStatistics.total,
                active: taskStatistics.active,
                completed: taskStatistics.completed
              }}
            />

            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              emptyMessage={getEmptyMessage()}
            />
          </Stack>

          {/* Mobile FAB */}
          <Fab
            color="primary"
            onClick={handleAddTask}
            disabled={loading}
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              display: { xs: 'flex', sm: 'none' },
              background: 'linear-gradient(45deg, #6366f1, #ec4899)',
              width: 64,
              height: 64,
              boxShadow: '0 8px 32px 0 rgba(99, 102, 241, 0.4)',
              '&:hover': {
                background: 'linear-gradient(45deg, #4f46e5, #db2777)',
                transform: 'scale(1.1)',
                boxShadow: '0 12px 40px 0 rgba(99, 102, 241, 0.6)'
              },
              '&:disabled': {
                opacity: 0.6,
                transform: 'none'
              }
            }}
            aria-label="Add new task"
          >
            <AddOutlinedIcon sx={{ fontSize: '1.5rem' }} />
          </Fab>

          <TaskForm
            open={formOpen}
            onClose={() => setFormOpen(false)}
            onSubmit={handleFormSubmit}
            editingTask={editingTask}
          />

          {/* Loading Backdrop */}
          <Backdrop
            sx={{ 
              color: '#fff', 
              zIndex: (theme) => theme.zIndex.drawer + 1,
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(5px)'
            }}
            open={loading}
          >
            <Stack alignItems="center" spacing={2}>
              <CircularProgress 
                sx={{
                  color: '#6366f1'
                }}
                aria-label="Loading"
              />
              <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 500 }}>
                {UI_MESSAGES.LOADING.FETCHING_TASKS}
              </Typography>
            </Stack>
          </Backdrop>

          {/* Error Snackbar */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              onClose={handleCloseSnackbar} 
              severity="error" 
              sx={{ 
                width: '100%',
                background: 'rgba(239, 68, 68, 0.9)',
                backdropFilter: 'blur(10px)',
                color: '#ffffff',
                borderRadius: '12px'
              }}
              role="alert"
            >
              {error || UI_MESSAGES.ERROR.GENERIC_ERROR}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

const TaskApp: React.FC = () => {
  return (
    <Provider store={store}>
      <TaskAppContent />
    </Provider>
  );
};

export default TaskApp;