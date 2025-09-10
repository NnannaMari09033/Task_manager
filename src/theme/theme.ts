import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
          contrastText: '#ffffff'
        },
        secondary: {
          main: '#ec4899',
          light: '#f472b6',
          dark: '#db2777',
          contrastText: '#ffffff'
        },
        error: {
          main: '#ef4444',
          light: '#f87171',
          dark: '#dc2626',
          contrastText: '#ffffff'
        },
        warning: {
          main: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
          contrastText: '#ffffff'
        },
        success: {
          main: '#10b981',
          light: '#34d399',
          dark: '#059669',
          contrastText: '#ffffff'
        },
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
          disabled: '#cbd5e1'
        },
        background: {
          default: '#f8fafc',
          paper: 'rgba(255, 255, 255, 0.9)'
        },
        grey: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        divider: 'rgba(148, 163, 184, 0.2)'
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#818cf8',
          light: '#a5b4fc',
          dark: '#6366f1',
          contrastText: '#ffffff'
        },
        secondary: {
          main: '#f472b6',
          light: '#f9a8d4',
          dark: '#ec4899',
          contrastText: '#ffffff'
        },
        error: {
          main: '#f87171',
          light: '#fca5a5',
          dark: '#ef4444',
          contrastText: '#ffffff'
        },
        warning: {
          main: '#fbbf24',
          light: '#fcd34d',
          dark: '#f59e0b',
          contrastText: '#ffffff'
        },
        success: {
          main: '#34d399',
          light: '#6ee7b7',
          dark: '#10b981',
          contrastText: '#ffffff'
        },
        text: {
          primary: '#f8fafc',
          secondary: '#cbd5e1',
          disabled: '#64748b'
        },
        background: {
          default: '#0f172a',
          paper: 'rgba(30, 41, 59, 0.9)'
        },
        grey: {
          50: '#0f172a',
          100: '#1e293b',
          200: '#334155',
          300: '#475569',
          400: '#64748b',
          500: '#94a3b8',
          600: '#cbd5e1',
          700: '#e2e8f0',
          800: '#f1f5f9',
          900: '#f8fafc'
        },
        divider: 'rgba(203, 213, 225, 0.1)'
      }
    }
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.3
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.025em'
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          background: theme.palette.mode === 'light' 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
          minHeight: '100vh',
          transition: 'background 0.3s ease'
        }
      })
    },
    MuiCard: {
      styleOverrides: (theme) => ({
        root: {
          background: theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(30, 41, 59, 0.3)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.2)' 
            : 'rgba(255, 255, 255, 0.1)'}`,
          borderRadius: '20px',
          boxShadow: theme.palette.mode === 'light'
            ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            : '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: theme.palette.mode === 'light'
              ? '0 20px 40px 0 rgba(31, 38, 135, 0.5)'
              : '0 20px 40px 0 rgba(0, 0, 0, 0.7)',
            background: theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(30, 41, 59, 0.4)'
          }
        }
      })
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '12px 24px',
          fontSize: '0.95rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 4px 15px 0 rgba(31, 38, 135, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px 0 rgba(31, 38, 135, 0.4)'
          }
        },
        contained: {
          background: 'linear-gradient(45deg, #6366f1, #ec4899)',
          '&:hover': {
            background: 'linear-gradient(45deg, #4f46e5, #db2777)'
          }
        },
        outlined: (theme) => ({
          background: theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(30, 41, 59, 0.3)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.3)' 
            : 'rgba(255, 255, 255, 0.2)'}`,
          '&:hover': {
            background: theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(30, 41, 59, 0.4)',
            border: `1px solid ${theme.palette.mode === 'light' 
              ? 'rgba(255, 255, 255, 0.5)' 
              : 'rgba(255, 255, 255, 0.3)'}`
          }
        })
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontWeight: 500,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }
      }
    },
    MuiTextField: {
      styleOverrides: (theme) => ({
        root: {
          '& .MuiOutlinedInput-root': {
            background: theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(30, 41, 59, 0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            '& fieldset': {
              border: `1px solid ${theme.palette.mode === 'light' 
                ? 'rgba(255, 255, 255, 0.3)' 
                : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: '12px'
            },
            '&:hover fieldset': {
              border: `1px solid ${theme.palette.mode === 'light' 
                ? 'rgba(255, 255, 255, 0.5)' 
                : 'rgba(255, 255, 255, 0.3)'}`
            },
            '&.Mui-focused fieldset': {
              border: '2px solid rgba(99, 102, 241, 0.8)'
            }
          }
        }
      })
    },
    MuiPaper: {
      styleOverrides: (theme) => ({
        root: {
          background: theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(30, 41, 59, 0.3)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.2)' 
            : 'rgba(255, 255, 255, 0.1)'}`,
          borderRadius: '16px'
        }
      })
    },
    MuiAppBar: {
      styleOverrides: (theme) => ({
        root: {
          background: theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(30, 41, 59, 0.3)',
          backdropFilter: 'blur(20px)',
          border: 'none',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
        }
      })
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #6366f1, #ec4899)',
          boxShadow: '0 8px 32px 0 rgba(99, 102, 241, 0.4)',
          '&:hover': {
            background: 'linear-gradient(45deg, #4f46e5, #db2777)',
            transform: 'scale(1.1)',
            boxShadow: '0 12px 40px 0 rgba(99, 102, 241, 0.6)'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: (theme) => ({
        root: {
          borderRadius: '12px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(255, 255, 255, 0.05)',
            transform: 'scale(1.1)'
          }
        }
      })
    },
    MuiDialog: {
      styleOverrides: (theme) => ({
        paper: {
          background: theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.3)' 
            : 'rgba(255, 255, 255, 0.2)'}`,
          borderRadius: '24px',
          boxShadow: '0 20px 60px 0 rgba(31, 38, 135, 0.3)'
        }
      })
    }
  }
});

export default theme;