import { Box, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function OutputDisplay({ output, loading, error }) {
  if (loading) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          Generating your study guide...
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          This may take a moment
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: 1,
          borderColor: 'error.main',
          borderRadius: 2,
        }}
      >
        <Alert severity="error">
          {error}
        </Alert>
      </Paper>
    );
  }

  if (!output) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Your study guide will appear here after processing
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: 1,
        borderColor: 'success.main',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <CheckCircleIcon sx={{ color: 'success.main', fontSize: 32 }} />
        <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 600 }}>
          Your Study Guide
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: 'background.default',
          p: 3,
          borderRadius: 1,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="body1"
          component="div"
          sx={{
            color: 'text.primary',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.8,
          }}
        >
          {output}
        </Typography>
      </Box>
    </Paper>
  );
}

export default OutputDisplay;
