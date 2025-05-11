// src/services/contractService.js
import api from './api';

const contractService = {
  // Contract Types
  getContractTypes: async () => {
    const response = await api.get('/contracts/types');
    return response.data;
  },

  getContractType: async (id) => {
    const response = await api.get(`/contracts/types/${id}`);
    return response.data;
  },

  // Lawyers
  getLawyers: async () => {
    const response = await api.get('/contracts/lawyers');
    return response.data;
  },

  // Contracts
  createContract: async (contractData) => {
    const response = await api.post('/contracts', contractData);
    return response.data;
  },

  // Client contracts
  getClientContracts: async () => {
    const response = await api.get('/contracts/client');
    return response.data;
  },

  // Lawyer contracts
  getLawyerPendingContracts: async () => {
    const response = await api.get('/contracts/lawyer/pending');
    return response.data;
  },

  getLawyerContracts: async () => {
    const response = await api.get('/contracts/lawyer');
    return response.data;
  },

  // Get single contract
  getContract: async (id) => {
    const response = await api.get(`/contracts/${id}`);
    return response.data;
  },

  // Sign contract
  signContract: async (id) => {
    const response = await api.put(`/contracts/${id}/sign`);
    return response.data;
  },

  // Reject contract
  rejectContract: async (id, rejectionReason) => {
    const response = await api.put(`/contracts/${id}/reject`, { rejectionReason });
    return response.data;
  },

  // Download contract
  downloadContract: async (id) => {
    const response = await api.get(`/contracts/${id}/download`);
    return response.data.documentUrl;
  }
};

export default contractService;