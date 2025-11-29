import { createTheme } from '@mui/material/styles';

// GitHub-inspired dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0033FF', // Intelliphy Blue
      light: '#4D70FF',
      dark: '#0022CC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      dark: '#E0E0E0',
      light: '#FFFFFF',
      contrastText: '#000000',
    },
    background: {
      default: '#020205', // Very deep, almost black blue
      paper: '#05050A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.6)',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 600,
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 500,
      letterSpacing: '-0.02em',
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Sharp corners for grid look
          padding: '12px 24px',
          boxShadow: 'none',
          border: '1px solid transparent',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: 'none',
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          backgroundColor: '#0033FF',
          '&:hover': {
            backgroundColor: '#0022CC',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          '&:hover': {
            borderColor: '#FFFFFF',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#05050A',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 0, // Sharp corners
          boxShadow: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(2, 2, 5, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
