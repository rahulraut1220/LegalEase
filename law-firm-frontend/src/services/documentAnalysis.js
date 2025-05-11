import api from './api';

export const uploadAndAnalyzeDocument = async (file) => {
  try {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await api.post('/pdf/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000, // Increase timeout to 30 seconds
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Document analysis error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to analyze document',
    };
  }
};

export const getDocumentHistory = async () => {
  try {
    const response = await api.get('/pdf/history');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching document history:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch document history',
    };
  }
}; 