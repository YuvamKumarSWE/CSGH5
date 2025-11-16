import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import axiosInstance from '../services/axiosInterceptor';

function Password() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axiosInstance.post('/api/verify-password', { password });
      
      if (response.data.success) {
        // Store authentication in sessionStorage
        sessionStorage.setItem('authenticated', 'true');
        navigate('/landing');
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (err) {
      setError('Failed to verify password. Please try again.');
      console.error('Password verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Access Required
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom align="center" sx={{ mb: 3 }}>
            Please enter the password to continue
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
              helperText={error}
              disabled={loading}
              sx={{ mb: 3 }}
              autoFocus
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading || !password}
            >
              {loading ? 'Verifying...' : 'Submit'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Password;
