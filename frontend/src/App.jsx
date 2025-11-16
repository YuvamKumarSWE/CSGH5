import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Password from './components/Password';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

// Protected Route component
function ProtectedRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Password />} />
          <Route 
            path="/landing" 
            element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
