import axiosInstance from './axiosInterceptor';

// API service functions
const apiService = {
  getBaseMessage: async () => {
    const response = await axiosInstance.get('/');
    return response.data;
  },

  verifyPassword: async (password) => {
    const response = await axiosInstance.post('/api/verify-password', { password });
    return response.data;
  },

  getOutput: async (formData) => {
    const response = await axiosInstance.post('/api/get-output', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default apiService;