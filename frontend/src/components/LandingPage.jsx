import { Box, Container, Typography, Button, Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const GridSection = ({ title, children, borderTop = true }) => (
  <Box
    sx={{
      borderTop: borderTop ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      py: 8,
      position: 'relative',
    }}
  >
    <Container maxWidth="xl">
      <Grid container spacing={0}>
        <Grid item xs={12} md={3} sx={{ borderRight: { md: '1px solid rgba(255, 255, 255, 0.1)' }, pr: 4 }}>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: 400 }}>
            [ {title} ]
          </Typography>
        </Grid>
        <Grid item xs={12} md={9} sx={{ pl: { md: 8 }, pt: { xs: 4, md: 0 } }}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </Box>
);

function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', className: 'grid-bg' }}>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          pt: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={0} alignItems="center">
            {/* Left: Text */}
            <Grid item xs={12} md={8} sx={{ borderRight: { md: '1px solid rgba(255, 255, 255, 0.1)' }, pr: { md: 8 }, py: 8 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 2, fontWeight: 600 }}>
                  INTELLIGENT STUDY FUSION
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '3.5rem', md: '5rem' },
                    fontWeight: 600,
                    lineHeight: 1,
                    mb: 4,
                    letterSpacing: '-0.03em',
                  }}
                >
                  Revolutionizing <br />
                  <span style={{ color: theme.palette.primary.main }}>Knowledge</span> <br />
                  Synthesis
                </Typography>

                <Typography variant="h5" sx={{ color: 'text.secondary', mb: 6, maxWidth: '600px', fontWeight: 400 }}>
                  Turn multiple sources into one perfect study guide. Upload PDFs, add web links, and include videos to generate a comprehensive learning resource.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/dashboard')}
                    sx={{
                      bgcolor: 'primary.main',
                      color: '#fff',
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  >
                    Get Started
                  </Button>
                </Box>
              </motion.div>
            </Grid>

            {/* Right: Empty space */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '400px' }}>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Grid */}
      <Box sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Container maxWidth="xl" disableGutters>
          <Grid container>
            {[
              { title: 'PDF Analysis', desc: 'Deep semantic understanding of your documents.' },
              { title: 'Web Synthesis', desc: 'Real-time integration of web resources.' },
              { title: 'Video Processing', desc: 'Extract key insights from educational videos.' }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index} sx={{
                borderRight: { md: '1px solid rgba(255, 255, 255, 0.1)' },
                borderBottom: { xs: '1px solid rgba(255, 255, 255, 0.1)', md: 'none' },
                p: 6
              }}>
                <Typography variant="h3" sx={{ color: 'primary.main', mb: 2, opacity: 0.5 }}>0{index + 1}</Typography>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>{feature.title}</Typography>
                <Typography variant="body1" color="text.secondary">{feature.desc}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    </Box>
  );
}

export default LandingPage;