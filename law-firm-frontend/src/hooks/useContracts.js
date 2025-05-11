// src/hooks/useContracts.js
import { useState, useCallback } from 'react';
import contractService from '../services/contractService';

const useContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [pendingContracts, setPendingContracts] = useState([]);
  const [currentContract, setCurrentContract] = useState(null);
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPending, setLoadingPending] = useState(false);
  const [error, setError] = useState(null);
  const [errorPending, setErrorPending] = useState(null);

  // Get client contracts
  const fetchClientContracts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await contractService.getClientContracts();
      setContracts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch contracts');
    } finally {
      setLoading(false);
    }
  }, []);
  // Get lawyer's pending contracts
  const fetchLawyerPendingContracts = useCallback(async () => {
    try {
      setLoadingPending(true);
      setErrorPending(null);
      const response = await contractService.getLawyerPendingContracts();
      setPendingContracts(response.data);
    } catch (err) {
      setErrorPending(err.response?.data?.message || 'Failed to fetch pending contracts');
    } finally {
      setLoadingPending(false);
    }
  }, []);

  // Get all lawyer contracts
  const fetchLawyerContracts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await contractService.getLawyerContracts();
      setContracts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch contracts');
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single contract
  const fetchContract = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await contractService.getContract(id);
      setCurrentContract(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch contract details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create contract
  const createContract = useCallback(async (contractData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await contractService.createContract(contractData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create contract');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Sign contract
  const signContract = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await contractService.signContract(id);
      setCurrentContract(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign contract');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Reject contract
  const rejectContract = useCallback(async (id, rejectionReason) => {
    try {
      setLoading(true);
      setError(null);
      const response = await contractService.rejectContract(id, rejectionReason);
      setCurrentContract(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject contract');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Download contract
const downloadContract = useCallback(async (id) => {
  try {
    setLoading(true);
    setError(null);

    const documentUrl = await contractService.downloadContract(id);

    // Use hardcoded base URL
    const fullUrl = `http://localhost:5000${documentUrl}`;

    // Open in new tab
    window.open(fullUrl, '_blank');
    return documentUrl;
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to download contract');
    throw err;
  } finally {
    setLoading(false);
  }
}, []);


  // Fetch lawyers (for client to select from)
  const fetchLawyers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await contractService.getLawyers();
      setLawyers(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch lawyers');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    contracts,
    pendingContracts,
    currentContract,
    lawyers,
    loading,
    loadingPending,
    error,
    errorPending,
    fetchClientContracts,
    fetchLawyerPendingContracts,
    fetchLawyerContracts,
    fetchContract,
    createContract,
    signContract,
    rejectContract,
    downloadContract,
    fetchLawyers
  };
};

export default useContracts;