import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import loadingVideo from '../assets/loading.mp4';

function VideoLoadingOverlay({ onClose }) {
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
    onClose(); // Fall back to regular loader if video fails
  };

  if (videoError) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          color: 'white',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          zIndex: 10000,
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Loading Text */}
      <Typography
        variant="h5"
        sx={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(25, 0, 24, 0.8)',
          fontWeight: 600,
          textAlign: 'center',
          backgroundColor: 'rgba(177, 177, 177, 0.8)',
          padding: '12px 24px',
          borderRadius: '8px',
          textShadow: 'none',
          letterSpacing: '0.3px',
          zIndex: 10000,
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              opacity: 1,
            },
            '50%': {
              opacity: 0.8,
            },
          },
        }}
      >
        Generating the study guide ....
      </Typography>

      {/* Video */}
      <Box
        component="video"
        autoPlay
        loop
        muted
        onError={handleVideoError}
        sx={{
          maxWidth: '80%',
          maxHeight: '80%',
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        <source src={loadingVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </Box>
    </Box>
  );
}

export default VideoLoadingOverlay;