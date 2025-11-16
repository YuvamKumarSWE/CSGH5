import { Box, Container, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ApiIcon from '@mui/icons-material/Api';
import { useState } from 'react';
import apiService from '../services/api';

function LandingPage() {
  const navigate = useNavigate();
  const [apiMessage, setApiMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTestApi = async () => {
    setLoading(true);
    setError('');
    setApiMessage('');
    
    try {
      const data = await apiService.getBaseMessage();
      setApiMessage(data.message);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to connect to API. Make sure the FastAPI server is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #0d1117 0%, #161b22 100%)',
        padding: 3,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            animation: 'fadeIn 1s ease-in',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <AutoStoriesIcon
            sx={{
              fontSize: 80,
              color: 'primary.main',
              mb: 3,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.7 },
              },
            }}
          />
          
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg, #58a6ff 0%, #79c0ff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            CSGH5
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 4,
              fontWeight: 400,
            }}
          >
            Turn multiple sources into one perfect study guide
          </Typography>
          
          <Box sx={{ mb: 6 }}>
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
              📄 Upload PDFs • 🌐 Add Web Articles • 🎥 Include Videos
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Get a single, comprehensive study guide tailored to your needs
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: '0 0 20px rgba(88, 166, 255, 0.3)',
              '&:hover': {
                boxShadow: '0 0 30px rgba(88, 166, 255, 0.5)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease',
              },
            }}
          >
            Get Started
          </Button>

          {/* API Test Section */}
          <Box sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              size="medium"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ApiIcon />}
              onClick={handleTestApi}
              disabled={loading}
              sx={{
                py: 1,
                px: 3,
                fontSize: '0.9rem',
                fontWeight: 500,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.light',
                  bgcolor: 'rgba(88, 166, 255, 0.1)',
                },
              }}
            >
              {loading ? 'Connecting...' : 'Test API Connection'}
            </Button>

            {apiMessage && (
              <Alert 
                severity="success" 
                sx={{ 
                  mt: 2, 
                  maxWidth: 500, 
                  mx: 'auto',
                  bgcolor: 'rgba(46, 160, 67, 0.1)',
                  color: 'success.light',
                }}
              >
                <Typography variant="body2">
                  <strong>API Response:</strong> {apiMessage}
                </Typography>
              </Alert>
            )}

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mt: 2, 
                  maxWidth: 500, 
                  mx: 'auto',
                  bgcolor: 'rgba(248, 81, 73, 0.1)',
                  color: 'error.light',
                }}
              >
                <Typography variant="body2">
                  {error}
                </Typography>
              </Alert>
            )}
          </Box>
          
          <Box
            sx={{
              mt: 8,
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: 3,
            }}
          >
            {[
              { title: 'Smart Fusion', desc: 'AI-powered content merging' },
              { title: 'Multi-Source', desc: 'PDFs, web, and video support' },
              { title: 'One Output', desc: 'Single cohesive study guide' },
            ].map((feature, index) => (
              <Box
                key={index}
                sx={{
                  flex: '1 1 200px',
                  p: 3,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {feature.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LandingPage;