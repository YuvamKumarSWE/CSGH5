import { Box, Typography, Paper, Chip, IconButton, Divider, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LanguageIcon from '@mui/icons-material/Language';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SendIcon from '@mui/icons-material/Send';

function CollectedItems({ items, onRemove, onSubmit }) {
  const getIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdfIcon />;
      case 'webpage':
        return <LanguageIcon />;
      case 'text':
        return <TextFieldsIcon />;
      case 'video':
        return <VideoLibraryIcon />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'webpage':
        return 'Web';
      case 'text':
        return 'Text';
      case 'video':
        return 'Video';
      default:
        return type;
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
        📚 Collected Items ({items.length})
      </Typography>

      {items.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            color: 'text.secondary',
          }}
        >
          <Typography variant="body1">
            No items added yet. Add PDFs, web articles, text, or videos above.
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 3 }}>
            {items.map((item, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 2,
                    gap: 2,
                  }}
                >
                  <Chip
                    icon={getIcon(item.type)}
                    label={getTypeLabel(item.type)}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Typography
                    sx={{
                      flex: 1,
                      color: 'text.primary',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => onRemove(index)}
                    sx={{
                      color: 'error.main',
                      '&:hover': {
                        bgcolor: 'error.dark',
                        opacity: 0.1,
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                {index < items.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={<SendIcon />}
            onClick={onSubmit}
            sx={{
              py: 1.5,
              fontWeight: 600,
            }}
          >
            Generate Study Guide
          </Button>
        </>
      )}
    </Paper>
  );
}

export default CollectedItems;
