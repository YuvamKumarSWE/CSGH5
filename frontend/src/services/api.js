import axiosInstance from './axiosInterceptor';

// API service functions
const apiService = {
  getBaseMessage: async () => {
    const response = await axiosInstance.get('/');
    return response.data;
  },
};

export default apiService;