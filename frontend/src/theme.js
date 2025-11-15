import { createTheme } from '@mui/material/styles';

// GitHub-inspired dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#58a6ff', // GitHub blue
      dark: '#1f6feb',
      light: '#79c0ff',
    },
    secondary: {
      main: '#8b949e', // GitHub gray
      dark: '#6e7681',
      light: '#b1bac4',
    },
    background: {
      default: '#0d1117', // GitHub dark background
      paper: '#161b22', // GitHub card background
    },
    text: {
      primary: '#c9d1d9', // GitHub primary text
      secondary: '#8b949e', // GitHub secondary text
    },
    success: {
      main: '#3fb950', // GitHub green
    },
    error: {
      main: '#f85149', // GitHub red
    },
    warning: {
      main: '#d29922', // GitHub yellow
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
