import React from 'react';
import {
  Stack,
  TextField,
  Button,
  InputAdornment,
  Paper,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { FilterType } from '../types/task.types';
import { FILTER_TYPES } from '../config/constants';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

const GlassPaper = styled(Paper)(({ theme }) => ({
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
  padding: theme.spacing(3),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(30, 41, 59, 0.5)',
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 12px 40px 0 rgba(31, 38, 135, 0.5)'
      : '0 12px 40px 0 rgba(0, 0, 0, 0.7)'
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(30, 41, 59, 0.4)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    fontSize: '1rem',
    '& fieldset': {
      border: `1px solid ${theme.palette.mode === 'light' 
        ? 'rgba(255, 255, 255, 0.4)' 
        : 'rgba(255, 255, 255, 0.3)'}`,
      borderRadius: '16px'
    },
    '&:hover fieldset': {
      border: `1px solid ${theme.palette.mode === 'light' 
        ? 'rgba(255, 255, 255, 0.6)' 
        : 'rgba(255, 255, 255, 0.4)'}`
    },
    '&.Mui-focused fieldset': {
      border: '2px solid rgba(99, 102, 241, 0.8)',
      boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
    },
    '& input': {
      color: '#ffffff',
      fontWeight: 500,
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.7)',
        opacity: 1
      }
    }
  }
}));

const FilterButton = styled(Button)<{ isActive?: boolean }>(({ isActive, theme }) => ({
  borderRadius: '12px',
  padding: '10px 20px',
  fontWeight: 600,
  fontSize: '0.9rem',
  textTransform: 'none',
  border: `1px solid ${theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.3)' 
    : 'rgba(255, 255, 255, 0.2)'}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  background: isActive 
    ? 'linear-gradient(45deg, #6366f1, #ec4899)'
    : theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(30, 41, 59, 0.3)',
  color: '#ffffff',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    background: isActive
      ? 'linear-gradient(45deg, #4f46e5, #db2777)'
      : theme.palette.mode === 'light'
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(30, 41, 59, 0.4)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px 0 rgba(99, 102, 241, 0.4)',
    border: `1px solid ${theme.palette.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.5)' 
      : 'rgba(255, 255, 255, 0.3)'}`
  }
}));

const FilterBar: React.FC<FilterBarProps> = React.memo(({
  searchQuery,
  onSearchChange,
  currentFilter,
  onFilterChange,
  taskCounts
}) => {
  const filterButtons = [
    { 
      type: FILTER_TYPES.ALL, 
      label: `All (${taskCounts.all})`,
      'aria-label': `Show all tasks, ${taskCounts.all} total`
    },
    { 
      type: FILTER_TYPES.ACTIVE, 
      label: `Active (${taskCounts.active})`,
      'aria-label': `Show active tasks, ${taskCounts.active} active`
    },
    { 
      type: FILTER_TYPES.COMPLETED, 
      label: `Done (${taskCounts.completed})`,
      'aria-label': `Show completed tasks, ${taskCounts.completed} completed`
    }
  ];

  return (
    <GlassPaper elevation={0}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        <Box sx={{ flex: 1 }}>
          <StyledTextField
            placeholder="Search your tasks... ✨"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            size="medium"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.3rem' }} />
                </InputAdornment>
              ),
            }}
            aria-label="Search tasks"
          />
        </Box>
        
        <Stack direction="row" spacing={1}>
          {filterButtons.map(({ type, label, 'aria-label': ariaLabel }) => (
            <FilterButton
              key={type}
              isActive={currentFilter === type}
              onClick={() => onFilterChange(type)}
              aria-label={ariaLabel}
            >
              {label}
            </FilterButton>
          ))}
        </Stack>
      </Stack>
    </GlassPaper>
  );
});

FilterBar.displayName = 'FilterBar';

export default FilterBar;