import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import TaskCard from './TaskCard';
import { Task } from '../types/task.types';
import { sortTasks } from '../utils/taskUtils';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  emptyMessage?: string;
}

const TaskList: React.FC<TaskListProps> = React.memo(({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  emptyMessage = 'No tasks found'
}) => {
  const sortedTasks = sortTasks(tasks);

  if (sortedTasks.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          textAlign: 'center',
          background: (theme) => theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(30, 41, 59, 0.3)',
          backdropFilter: 'blur(20px)',
          border: (theme) => `1px solid ${theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.2)' 
            : 'rgba(255, 255, 255, 0.1)'}`,
          borderRadius: '20px',
          minHeight: '300px'
        }}
        role="status"
        aria-live="polite"
      >
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{
            color: 'white',
            fontWeight: 600,
            mb: 2,
            opacity: 0.9
          }}
        >
          {emptyMessage === 'No tasks found' ? '🌟 Ready to be productive?' : '✨ ' + emptyMessage}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}
        >
          {emptyMessage === 'No tasks found' 
            ? 'Add your first task and start your journey to productivity!'
            : 'Try adjusting your filters or search terms'}
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2} role="list" aria-label="Task list">
      {sortedTasks.map((task) => (
        <Box key={task.id} role="listitem">
          <TaskCard
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Box>
      ))}
    </Stack>
  );
});

TaskList.displayName = 'TaskList';

export default TaskList;