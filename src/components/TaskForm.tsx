import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Task, TaskFormData, TaskPriority } from '../types/task.types';
import { PRIORITY_LEVELS } from '../config/constants';
import { validateTaskForm } from '../utils/taskUtils';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  editingTask?: Task | null;
}

const initialFormData: TaskFormData = {
  title: '',
  description: '',
  dueDate: null,
  priority: PRIORITY_LEVELS.MEDIUM
};

const TaskForm: React.FC<TaskFormProps> = ({
  open,
  onClose,
  onSubmit,
  editingTask
}) => {
  const [formData, setFormData] = useState<TaskFormData>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        dueDate: editingTask.dueDate ? new Date(editingTask.dueDate) : null,
        priority: editingTask.priority
      });
    } else {
      setFormData(initialFormData);
    }
    setValidationErrors([]);
  }, [editingTask, open]);

  const handleSubmit = () => {
    const errors = validateTaskForm(formData);
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  const handleFieldChange = (field: keyof TaskFormData) => (value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const priorityOptions = [
    { value: PRIORITY_LEVELS.LOW, label: '🟢 Low', color: 'success' },
    { value: PRIORITY_LEVELS.MEDIUM, label: '🟡 Medium', color: 'warning' },
    { value: PRIORITY_LEVELS.HIGH, label: '🔴 High', color: 'error' }
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="sm" 
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '24px',
            boxShadow: '0 20px 60px 0 rgba(31, 38, 135, 0.3)'
          }
        }}
        aria-labelledby="task-form-title"
      >
        <DialogTitle 
          id="task-form-title"
          sx={{ 
            textAlign: 'center', 
            fontSize: '1.5rem', 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #6366f1, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            pb: 1
          }}
        >
          {editingTask ? '✏️ Edit Task' : '✨ Add New Task'}
        </DialogTitle>
        
        <DialogContent sx={{ px: 3 }}>
          {validationErrors.length > 0 && (
            <Alert 
              severity="error" 
              sx={{ mb: 2, borderRadius: '12px' }}
              role="alert"
            >
              {validationErrors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Alert>
          )}

          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Task Title"
              value={formData.title}
              onChange={(e) => handleFieldChange('title')(e.target.value)}
              required
              fullWidth
              autoFocus
              inputProps={{
                maxLength: 200,
                'aria-describedby': 'title-helper-text'
              }}
              helperText={`${formData.title.length}/200 characters`}
              id="title-helper-text"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'rgba(99, 102, 241, 0.3)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(99, 102, 241, 0.5)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6366f1',
                    boxShadow: '0 0 10px rgba(99, 102, 241, 0.2)'
                  }
                }
              }}
            />
            
            <TextField
              label="Description (Optional)"
              value={formData.description}
              onChange={(e) => handleFieldChange('description')(e.target.value)}
              multiline
              rows={3}
              fullWidth
              inputProps={{
                maxLength: 1000,
                'aria-describedby': 'description-helper-text'
              }}
              helperText={`${formData.description.length}/1000 characters`}
              id="description-helper-text"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'rgba(99, 102, 241, 0.3)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(99, 102, 241, 0.5)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6366f1',
                    boxShadow: '0 0 10px rgba(99, 102, 241, 0.2)'
                  }
                }
              }}
            />
            
            <DatePicker
              label="Due Date (Optional)"
              value={formData.dueDate}
              onChange={handleFieldChange('dueDate')}
              slotProps={{
                textField: { 
                  fullWidth: true,
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '& fieldset': {
                        borderColor: 'rgba(99, 102, 241, 0.3)'
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(99, 102, 241, 0.5)'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#6366f1',
                        boxShadow: '0 0 10px rgba(99, 102, 241, 0.2)'
                      }
                    }
                  }
                }
              }}
            />
            
            <FormControl fullWidth>
              <InputLabel id="priority-select-label">Priority Level</InputLabel>
              <Select
                labelId="priority-select-label"
                value={formData.priority}
                label="Priority Level"
                onChange={(e) => handleFieldChange('priority')(e.target.value as TaskPriority)}
                sx={{
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'rgba(99, 102, 241, 0.3)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(99, 102, 241, 0.5)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6366f1',
                    boxShadow: '0 0 10px rgba(99, 102, 241, 0.2)'
                  }
                }}
              >
                {priorityOptions.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
          <Button 
            onClick={onClose}
            sx={{
              borderRadius: '12px',
              px: 3,
              py: 1,
              fontWeight: 600,
              color: 'text.secondary',
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.05)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #6366f1, #ec4899)',
              borderRadius: '12px',
              px: 4,
              py: 1,
              fontWeight: 600,
              boxShadow: '0 4px 15px 0 rgba(99, 102, 241, 0.4)',
              '&:hover': {
                background: 'linear-gradient(45deg, #4f46e5, #db2777)',
                boxShadow: '0 6px 20px 0 rgba(99, 102, 241, 0.6)'
              }
            }}
          >
            {editingTask ? '💾 Save Changes' : '✨ Add Task'}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default TaskForm;