import { useState } from 'react';
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

      // Call the API
      const response = await apiService.getOutput(formData);
      
      // Display the response (if it's a string, use it directly; otherwise stringify)
      setOutput(typeof response === 'string' ? response : JSON.stringify(response, null, 2));
    } catch (err) {
      setError('Failed to generate study guide. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, color: 'text.primary', fontWeight: 600 }}>
          Dashboard
        </Typography>

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
          <>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" sx={{ mb: 3, color: 'text.primary', fontWeight: 600 }}>
              Output
            </Typography>
            <OutputDisplay output={output} loading={loading} error={error} />
          </>
        )}
      </Container>
    </Box>
  );
}

export default Dashboard;
