import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, ToggleButtonGroup, ToggleButton } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AddIcon from '@mui/icons-material/Add';

function TextInput({ onAdd }) {
  const [inputType, setInputType] = useState('text');
  const [textContent, setTextContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  const handleAddClick = () => {
    if (inputType === 'text') {
      if (!textContent.trim()) {
        setError('Please enter some text');
        return;
      }
      onAdd({ 
        type: 'text', 
        name: `Text (${textContent.slice(0, 30)}...)`,
        content: textContent 
      });
      setTextContent('');
    } else {
      if (!videoUrl.trim()) {
        setError('Please enter a video URL');
        return;
      }
      onAdd({ 
        type: 'video', 
        name: videoUrl,
        url: videoUrl 
      });
      setVideoUrl('');
    }
    setError('');
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
        ✍️ Add Text or Video
      </Typography>

      <ToggleButtonGroup
        value={inputType}
        exclusive
        onChange={(e, newType) => {
          if (newType !== null) {
            setInputType(newType);
            setError('');
          }
        }}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="text">
          <TextFieldsIcon sx={{ mr: 1 }} />
          Text
        </ToggleButton>
        <ToggleButton value="video">
          <VideoLibraryIcon sx={{ mr: 1 }} />
          Video
        </ToggleButton>
      </ToggleButtonGroup>

      {inputType === 'text' ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Paste your text content here..."
            value={textContent}
            onChange={(e) => {
              setTextContent(e.target.value);
              setError('');
            }}
            error={!!error}
            helperText={error}
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
            sx={{ alignSelf: 'flex-end' }}
          >
            Add Text
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            placeholder="https://youtube.com/watch?v=..."
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
              setError('');
            }}
            error={!!error}
            helperText={error}
            InputProps={{
              startAdornment: <VideoLibraryIcon sx={{ mr: 1, color: 'text.secondary' }} />,
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
      )}
    </Paper>
  );
}

export default TextInput;
