import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Chip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import AddIcon from '@mui/icons-material/Add';

function WebPageInput({ onAdd }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (urlString) => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddClick = () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    onAdd({ type: 'webpage', name: url, url: url });
    setUrl('');
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddClick();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
        🌐 Add Web Articles
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <TextField
          fullWidth
          placeholder="https://example.com/article"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError('');
          }}
          onKeyPress={handleKeyPress}
          error={!!error}
          helperText={error}
          InputProps={{
            startAdornment: <LanguageIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'background.default',
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          sx={{ minWidth: 100, height: 56 }}
        >
          Add
        </Button>
      </Box>
    </Paper>
  );
}

export default WebPageInput;
