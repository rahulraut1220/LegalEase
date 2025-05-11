// services/documents.js
import api from './api';

export const getAllDocuments = async (params = {}) => {
  try {
    const response = await api.get('/documents', { params });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch documents' 
    };
  }
};

export const getDocumentById = async (documentId) => {
  try {
    const response = await api.get(`/documents/${documentId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch document details' 
    };
  }
};

export const uploadDocument = async (formData) => {
  try {
    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to upload document' 
    };
  }
};

export const deleteDocument = async (documentId) => {
  try {
    await api.delete(`/documents/${documentId}`);
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to delete document' 
    };
  }
};

export const updateDocumentMetadata = async (documentId, metadata) => {
  try {
    const response = await api.put(`/documents/${documentId}/metadata`, metadata);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to update document metadata' 
    };
  }
};

export const shareDocument = async (documentId, recipientData) => {
  try {
    const response = await api.post(`/documents/${documentId}/share`, recipientData);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to share document' 
    };
  }
};

export const getCaseDocuments = async (caseId) => {
  try {
    const response = await api.get(`/cases/${caseId}/documents`);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch case documents' 
    };
  }
};