import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff88',
      light: '#00ffaa',
      dark: '#00cc6a',
      contrastText: '#000000',
    },
    secondary: {
      main: '#00ccff',
      light: '#33d6ff',
      dark: '#0099cc',
      contrastText: '#000000',
    },
    background: {
      default: '#0a0a0a',
      paper: 'rgba(0, 0, 0, 0.95)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
    error: {
      main: '#ff0080',
    },
    warning: {
      main: '#ffaa00',
    },
    info: {
      main: '#00ccff',
    },
    success: {
      main: '#00ff88',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #00ff88, #00ccff)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#cccccc',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#cccccc',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '2px solid rgba(0, 255, 136, 0.3)',
          boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(0, 255, 136, 0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.375rem',
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'left 0.5s ease',
          },
          '&:hover::before': {
            left: '100%',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #00ff88, #00ccff)',
          color: '#000000',
          border: 'none',
          boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #00ffaa, #33d6ff)',
            boxShadow: '0 6px 20px rgba(0, 255, 136, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          border: '2px solid rgba(255, 255, 255, 0.8)',
          color: '#ffffff',
          background: 'transparent',
          '&:hover': {
            border: '2px solid #00ff88',
            background: 'rgba(0, 255, 136, 0.1)',
            color: '#00ff88',
            boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
          },
        },
        text: {
          color: '#ffffff',
          '&:hover': {
            background: 'rgba(0, 255, 136, 0.1)',
            color: '#00ff88',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 255, 136, 0.2)',
          borderRadius: '0.75rem',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 30px rgba(0, 255, 136, 0.2)',
            border: '1px solid rgba(0, 255, 136, 0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '0.5rem',
            transition: 'all 0.3s ease',
            '&:hover': {
              border: '1px solid rgba(0, 255, 136, 0.5)',
            },
            '&.Mui-focused': {
              border: '2px solid #00ff88',
              boxShadow: '0 0 15px rgba(0, 255, 136, 0.3)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#cccccc',
            '&.Mui-focused': {
              color: '#00ff88',
            },
          },
          '& .MuiInputBase-input': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 255, 136, 0.2)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 255, 136, 0.1)',
          border: '1px solid rgba(0, 255, 136, 0.3)',
          color: '#00ff88',
          fontWeight: 500,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '0.5rem',
          '&:hover': {
            border: '1px solid rgba(0, 255, 136, 0.5)',
          },
          '&.Mui-focused': {
            border: '2px solid #00ff88',
            boxShadow: '0 0 15px rgba(0, 255, 136, 0.3)',
          },
        },
      },
    },
  },
}); 