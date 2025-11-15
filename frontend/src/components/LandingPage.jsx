import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function LandingPage() {
  const navigate = useNavigate();

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
            Auto-Note Fusion
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
