// services/cases.js
import api from './api';

export const getAllCases = async () => {
  try {
    const response = await api.get('/cases/my-cases');
    console.log("Raw API response:", response);
    
    if (response.data.success) {
      return { 
        success: true, 
        data: { cases: response.data.cases } 
      };
    } else {
      return {
        success: false,
        error: response.data.message || 'Failed to fetch cases'
      };
    }
  } catch (error) {
    console.error("Error fetching cases:", error);
    if (error.response?.status === 401) {
      return { 
        success: false, 
        error: 'Authentication required. Please login again.' 
      };
    }
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch cases' 
    };
  }
};

export const getCaseById = async (caseId) => {
  try {
    console.log(`Fetching case ${caseId} from API...`);
    const response = await api.get(`/cases/${caseId}`);
    console.log("Raw case response:", response);
    
    if (response.data.success) {
      return { 
        success: true, 
        data: { case: response.data.case } 
      };
    } else {
      return {
        success: false,
        error: response.data.message || 'Failed to fetch case details'
      };
    }
  } catch (error) {
    console.error("Error fetching case:", error);
    if (error.response?.status === 401) {
      return { 
        success: false, 
        error: 'Authentication required. Please login again.' 
      };
    }
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch case details' 
    };
  }
};

export const createCase = async (caseData) => {
  try {
    console.log("Creating new case:", caseData);
    const response = await api.post('/cases/create', caseData);
    console.log("Create case response:", response);
    
    return { 
      success: true, 
      data: { case: response.data.case } 
    };
  } catch (error) {
    console.error("Error creating case:", error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to create case' 
    };
  }
};

export const updateCase = async (caseId, caseData) => {
  try {
    const response = await api.put(`/cases/${caseId}`, caseData);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to update case' 
    };
  }
};

export const assignLawyer = async (caseId) => {
  try {
    console.log(`Assigning lawyer to case ${caseId}...`);
    const response = await api.put(`/cases/assign`, { caseId });
    console.log("Assign lawyer response:", response);
    
    return { 
      success: true, 
      data: { case: response.data.case } 
    };
  } catch (error) {
    console.error("Error assigning lawyer:", error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to assign lawyer' 
    };
  }
};

export const closeCase = async (caseId) => {
  try {
    console.log(`Closing case ${caseId}...`);
    const response = await api.put('/cases/close', { caseId });
    console.log("Close case response:", response);
    
    return { 
      success: true, 
      data: { case: response.data.case } 
    };
  } catch (error) {
    console.error("Error closing case:", error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to close case' 
    };
  }
};

export const getCaseTimeline = async (caseId) => {
  try {
    const response = await api.get(`/cases/${caseId}/timeline`);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch case timeline' 
    };
  }
};