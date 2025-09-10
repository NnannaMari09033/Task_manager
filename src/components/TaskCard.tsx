import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Checkbox,
  IconButton,
  Chip,
  Stack,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Task, TaskPriority } from '../types/task.types';
import { PRIORITY_LEVELS } from '../config/constants';
import { formatDueDate, isTaskOverdue } from '../utils/taskUtils';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const GlassCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.15)'
    : 'rgba(30, 41, 59, 0.4)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.3)' 
    : 'rgba(255, 255, 255, 0.2)'}`,
  borderRadius: '20px',
  boxShadow: theme.palette.mode === 'light'
    ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    : '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #6366f1, #ec4899, #10b981)',
    opacity: 0,
    transition: 'opacity 0.3s ease'
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 20px 40px 0 rgba(31, 38, 135, 0.5)'
      : '0 20px 40px 0 rgba(0, 0, 0, 0.7)',
    background: theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(30, 41, 59, 0.5)',
    '&::before': {
      opacity: 1
    }
  }
}));

const CompletedCard = styled(GlassCard)(({ theme }) => ({
  background: theme.palette.mode === 'light'
    ? 'rgba(16, 185, 129, 0.1)'
    : 'rgba(16, 185, 129, 0.15)',
  border: '1px solid rgba(16, 185, 129, 0.3)',
  '&::before': {
    background: 'linear-gradient(90deg, #10b981, #34d399)',
    opacity: 1
  }
}));

const StyledCheckbox = styled(Checkbox)(() => ({
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
  }
}));

const PriorityChip = styled(Chip)<{ priority: TaskPriority }>(({ priority }) => {
  const getGradient = () => {
    switch (priority) {
      case PRIORITY_LEVELS.HIGH:
        return 'linear-gradient(45deg, #ef4444, #f87171)';
      case PRIORITY_LEVELS.MEDIUM:
        return 'linear-gradient(45deg, #f59e0b, #fbbf24)';
      case PRIORITY_LEVELS.LOW:
        return 'linear-gradient(45deg, #10b981, #34d399)';
      default:
        return 'linear-gradient(45deg, #6b7280, #9ca3af)';
    }
  };

  return {
    background: getGradient(),
    color: '#ffffff',
    fontWeight: 600,
    borderRadius: '12px',
    border: 'none',
    boxShadow: '0 4px 15px 0 rgba(0, 0, 0, 0.2)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.3)'
    }
  };
});

const ActionButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '12px',
  padding: '8px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  background: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(30, 41, 59, 0.3)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.2)' 
    : 'rgba(255, 255, 255, 0.1)'}`,
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
    background: theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(30, 41, 59, 0.4)',
    boxShadow: '0 4px 15px 0 rgba(0, 0, 0, 0.2)'
  }
}));

const TaskCard: React.FC<TaskCardProps> = React.memo(({
  task,
  onToggleComplete,
  onEdit,
  onDelete
}) => {
  const dueDateText = formatDueDate(task.dueDate);
  const isOverdue = isTaskOverdue(task);
  
  const CardComponent = task.completed ? CompletedCard : GlassCard;

  return (
    <CardComponent
      sx={{
        opacity: task.completed ? 0.8 : 1,
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <StyledCheckbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleOutlineIcon />}
            sx={{ 
              mt: -1,
              color: task.completed ? 'success.main' : 'text.secondary',
              '&.Mui-checked': {
                color: 'success.main'
              }
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  flex: 1,
                  fontWeight: 600,
                  color: (theme) => task.completed 
                    ? theme.palette.text.secondary
                    : theme.palette.text.primary,
                  opacity: task.completed ? 0.7 : 1
                }}
              >
                {task.title}
              </Typography>
              <PriorityChip
                label={task.priority.toUpperCase()}
                size="small"
                priority={task.priority}
              />
            </Stack>
            
            {task.description && (
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: 'text.secondary',
                  opacity: task.completed ? 0.7 : 0.9,
                  lineHeight: 1.6
                }}
              >
                {task.description}
              </Typography>
            )}
            
            {dueDateText && (
              <Box
                sx={{
                  display: 'inline-block',
                  background: isOverdue 
                    ? 'linear-gradient(45deg, #ef4444, #f87171)'
                    : 'rgba(255, 255, 255, 0.2)',
                  color: isOverdue ? '#ffffff' : 'text.secondary',
                  px: 2,
                  py: 0.5,
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                {dueDateText}
              </Box>
            )}
          </Box>
        </Stack>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0, pb: 2, px: 2 }}>
        <ActionButton
          size="small"
          onClick={() => onEdit(task)}
          sx={{
            '&:hover': {
              color: 'primary.main',
              background: 'rgba(99, 102, 241, 0.1)'
            }
          }}
          aria-label={`Edit task: ${task.title}`}
        >
          <EditOutlinedIcon fontSize="small" />
        </ActionButton>
        <ActionButton
          size="small"
          onClick={() => onDelete(task.id)}
          sx={{
            '&:hover': {
              color: 'error.main',
              background: 'rgba(239, 68, 68, 0.1)'
            }
          }}
          aria-label={`Delete task: ${task.title}`}
        >
          <DeleteOutlinedIcon fontSize="small" />
        </ActionButton>
      </CardActions>
    </CardComponent>
  );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;