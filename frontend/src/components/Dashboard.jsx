import { useState, useRef, useEffect } from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import Navbar from './Navbar';
import FileUpload from './FileUpload';
import WebPageInput from './WebPageInput';
import TextInput from './TextInput';
import CollectedItems from './CollectedItems';
import OutputDisplay from './OutputDisplay';
import apiService from '../services/api';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [videoOverlayClosed, setVideoOverlayClosed] = useState(false);
  
  const outputRef = useRef(null);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setOutput('');
    setVideoOverlayClosed(false); // Reset video overlay state for new submission

    try {
      // Create FormData to send files
      const formData = new FormData();
      
      // Add PDF files
      const pdfItems = items.filter(item => item.type === 'pdf');
      pdfItems.forEach((item) => {
        if (item.file) {
          formData.append('pdfs', item.file);
        }
      });
      
      // Add other sources as JSON
      const otherSources = {
        urls: items.filter(item => item.type === 'webpage').map(item => item.name),
        videos: items.filter(item => item.type === 'video').map(item => item.name),
        text: items.filter(item => item.type === 'text').map(item => item.name)
      };
      
      formData.append('sources', JSON.stringify(otherSources));
      
      // Add API key if provided
      if (apiKey && apiKey.trim()) {
        formData.append('api_key', apiKey.trim());
      }

      // Call the API
      const response = await apiService.getOutput(formData);
      
      // Extract the study guide from the response
      if (response && response.study_guide) {
        setOutput(response.study_guide);
      } else if (typeof response === 'string') {
        setOutput(response);
      } else {
        setOutput(JSON.stringify(response, null, 2));
      }
    } catch (err) {
      console.error('Error:', err);
      
      // Extract error message from response if available
      let errorMessage = 'Failed to generate study guide. Please try again.';
      
      if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      // Add helpful context for rate limit errors
      if (errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
        errorMessage = '⚠️ API rate limit reached. Please wait 1-2 minutes and try again. Consider reducing the number of sources or amount of content.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to output section when loading completes
  useEffect(() => {
    if (!loading && (output || error) && outputRef.current) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        outputRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [loading, output, error]);

  const handleCloseVideoOverlay = () => {
    setVideoOverlayClosed(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, color: 'text.primary', fontWeight: 600 }}>
          Dashboard
        </Typography>

        {/* API Key Input */}
        <Box
          sx={{
            mb: 3,
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary', fontWeight: 600 }}>
            🔑 Gemini API Key (Optional)
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            Enter your own Gemini API key or leave blank to use the default. Get your key from{' '}
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
              Google AI Studio
            </a>
          </Typography>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API key (optional)"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontFamily: 'monospace',
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: 3,
          }}
        >
          {/* Input Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FileUpload onAdd={handleAddItem} />
            <WebPageInput onAdd={handleAddItem} />
            <TextInput onAdd={handleAddItem} />
          </Box>

          {/* Collected Items Section */}
          <Box>
            <CollectedItems
              items={items}
              onRemove={handleRemoveItem}
              onSubmit={handleSubmit}
            />
          </Box>
        </Box>

        {/* Output Section */}
        {(output || loading || error) && (
          <Box ref={outputRef}>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" sx={{ mb: 3, color: 'text.primary', fontWeight: 600 }}>
              Output
            </Typography>
            <OutputDisplay 
              output={output} 
              loading={loading} 
              error={error}
              showVideoOverlay={!videoOverlayClosed}
              onCloseVideoOverlay={handleCloseVideoOverlay}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Dashboard;