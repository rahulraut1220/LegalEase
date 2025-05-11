// src/hooks/useContractTypes.js
import { useState, useEffect, useCallback } from 'react';
import contractService from '../services/contractService';

const useContractTypes = () => {
  const [contractTypes, setContractTypes] = useState([]);
  const [currentType, setCurrentType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all contract types
  const fetchContractTypes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await contractService.getContractTypes();
      setContractTypes(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch contract types');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single contract type
  const fetchContractType = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await contractService.getContractType(id);
      setCurrentType(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch contract type');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load contract types on mount
  useEffect(() => {
    fetchContractTypes();
  }, [fetchContractTypes]);

  return {
    contractTypes,
    currentType,
    loading,
    error,
    fetchContractTypes,
    fetchContractType
  };
};

export default useContractTypes;