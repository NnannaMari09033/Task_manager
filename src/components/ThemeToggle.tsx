import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness6OutlinedIcon from '@mui/icons-material/Brightness6Outlined';

interface ThemeToggleProps {
  themeMode: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ themeMode, onToggle }) => {
  return (
    <Tooltip title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton onClick={onToggle} color="inherit">
        <Brightness6OutlinedIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;