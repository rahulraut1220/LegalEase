// hooks/useAuth.js
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import * as authService from '../services/auth';

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        setLoading(false);
      } catch (err) {
        setError('Authentication check failed');
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [setUser]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.login(email, password);
      
      if (result.success) {
        setUser(result.user);
        navigate('/dashboard');
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.register(userData);
      
      if (result.success) {
        navigate('/login', { state: { registered: true } });
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.updateProfile(userData);
      
      if (result.success) {
        setUser(result.user);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'Profile update failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };
};

export default useAuth;