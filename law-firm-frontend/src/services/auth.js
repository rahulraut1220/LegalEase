// services/auth.js
import api from './api';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

export const login = async (email, password) => {
  try {
    console.log('Attempting login with:', email);
    const response = await api.post('/auth/login', { email, password });
    console.log('Login response:', response.data);
    
    if (!response.data || !response.data.token) {
      throw new Error('Invalid response from server');
    }
    
    const { token, ...user } = response.data;
    
    // Store token and user data
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    
    // Set the default authorization header for future requests
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    return { success: true, user };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Login failed. Please check your credentials and try again.' 
    };
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    const { token, ...user } = response.data;
    
    // Store token and user data
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Registration failed. Please try again.' 
    };
  }
};

export const logout = async () => {
  try {
    // Clear the authorization header
    delete api.defaults.headers.common['Authorization'];
    
    // Clear local storage
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    
    // Redirect to login page
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    // Set the authorization header if token exists
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return true;
  }
  return false;
};

export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/auth/profile', userData);
    
    // Update stored user data
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
    
    return { success: true, user: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Profile update failed. Please try again.' 
    };
  }
};

export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    const user = response.data;
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch profile.',
    };
  }
};
