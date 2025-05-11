// services/api.js
import axios from 'axios';

// Create an axios instance with default configs
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Updated to point to backend port
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle 401 Unauthorized errors (token expired)
    if (response && response.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login?session_expired=true';
    }
    
    // Handle 403 Forbidden errors
    if (response && response.status === 403) {
      console.error('Access forbidden');
    }
    
    // Handle 500 server errors
    if (!response || response.status >= 500) {
      console.error('Server error, please try again later');
    }
    
    return Promise.reject(error);
  }
);

export default api;