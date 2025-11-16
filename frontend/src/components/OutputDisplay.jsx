import { Box, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect } from 'react';

// Simple markdown parser for basic formatting
const parseMarkdown = (text) => {
  if (!text) return [];
  
  const lines = text.split('\n');
  const elements = [];
  let currentList = null;
  
  lines.forEach((line, index) => {
    // Headers
    if (line.startsWith('# ')) {
      elements.push({ type: 'h1', content: line.slice(2), key: `h1-${index}` });
    } else if (line.startsWith('## ')) {
      elements.push({ type: 'h2', content: line.slice(3), key: `h2-${index}` });
    } else if (line.startsWith('### ')) {
      elements.push({ type: 'h3', content: line.slice(4), key: `h3-${index}` });
    }
    // Horizontal rule
    else if (line.trim() === '---' || line.trim() === '***') {
      elements.push({ type: 'hr', key: `hr-${index}` });
    }
    // List items
    else if (line.match(/^[-*]\s+/)) {
      const content = line.replace(/^[-*]\s+/, '');
      if (currentList) {
        currentList.items.push(content);
      } else {
        currentList = { type: 'list', items: [content], key: `list-${index}` };
        elements.push(currentList);
      }
    }
    // Links (basic support)
    else if (line.includes('<a id=')) {
      // Skip anchor tags
      return;
    }
    // Bold text
    else if (line.includes('**')) {
      elements.push({ type: 'text', content: line, key: `text-${index}`, bold: true });
      currentList = null;
    }
    // Regular text
    else if (line.trim()) {
      elements.push({ type: 'text', content: line, key: `text-${index}` });
      currentList = null;
    }
    // Empty line
    else {
      currentList = null;
    }
  });
  
  return elements;
};

const renderMarkdownElement = (element) => {
  switch (element.type) {
    case 'h1':
      return (
        <Typography key={element.key} variant="h3" sx={{ fontWeight: 700, mt: 3, mb: 2, color: 'primary.main' }}>
          {element.content}
        </Typography>
      );
    case 'h2':
      return (
        <Typography key={element.key} variant="h4" sx={{ fontWeight: 600, mt: 3, mb: 2, color: 'text.primary' }}>
          {element.content}
        </Typography>
      );
    case 'h3':
      return (
        <Typography key={element.key} variant="h5" sx={{ fontWeight: 600, mt: 2, mb: 1.5, color: 'text.primary' }}>
          {element.content}
        </Typography>
      );
    case 'hr':
      return <Box key={element.key} sx={{ borderTop: 2, borderColor: 'divider', my: 3 }} />;
    case 'list':
      return (
        <Box key={element.key} component="ul" sx={{ pl: 3, my: 1.5 }}>
          {element.items.map((item, idx) => (
            <Typography key={`${element.key}-item-${idx}`} component="li" sx={{ mb: 0.5, lineHeight: 1.8 }}>
              {item}
            </Typography>
          ))}
        </Box>
      );
    case 'text':
      if (element.bold) {
        // Handle bold text with **
        const parts = element.content.split('**');
        return (
          <Typography key={element.key} sx={{ mb: 1, lineHeight: 1.8 }}>
            {parts.map((part, idx) => (
              idx % 2 === 1 ? <strong key={idx}>{part}</strong> : <span key={idx}>{part}</span>
            ))}
          </Typography>
        );
      }
      return (
        <Typography key={element.key} sx={{ mb: 1, lineHeight: 1.8 }}>
          {element.content}
        </Typography>
      );
    default:
      return null;
  }
};

function OutputDisplay({ output, loading, error }) {
  const [parsedContent, setParsedContent] = useState([]);
  
  useEffect(() => {
    if (output) {
      const parsed = parseMarkdown(output);
      setParsedContent(parsed);
    }
  }, [output]);

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
          This may take a few minutes. Please wait...
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
          p: 4,
          borderRadius: 1,
          border: 1,
          borderColor: 'divider',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        {parsedContent.map(element => renderMarkdownElement(element))}
      </Box>
    </Paper>
  );
}

export default OutputDisplay;
