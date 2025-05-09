import axios from 'axios';
import authToken from '../localstorage/authToken';
import { isTokenExpired } from '../lib/utils/jwt.utils';
import { toast } from 'sonner';

// Create base API instance
const apiInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to each request
apiInstance.interceptors.request.use(async (config) => {
  const token = authToken.get();

  // If no token, proceed without auth header
  if (!token) {
    return config;
  }

  // Check if token is expired
  if (isTokenExpired(token)) {
    try {
      // For a real implementation, call refresh token endpoint
      // For now, we'll redirect to login
      toast.error('Your session has expired. Please log in again.');
      authToken.remove();
      window.location.href = '/login';
      return Promise.reject('Token expired');
    } catch (error) {
      console.error('Failed to refresh token:', error);
      return Promise.reject(error);
    }
  }

  // Add token to headers
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor to handle errors
apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Prevent infinite retry loop
    const originalRequest = { ...error.config };
    originalRequest._isRetry = true;

    if (
      // Check if error is due to invalid token
      error.response?.status === 401 &&
      // Check if request is not already retried
      error.config &&
      !error.config._isRetry
    ) {
      try {
        // In a real app, this would call an actual refresh token endpoint
        // For now, we'll just redirect to login
        toast.error('Authentication failed. Please log in again.');
        authToken.remove();
        window.location.href = '/login';
        return Promise.reject('Authentication failed');
      } catch (refreshError) {
        console.error('Authentication refresh error:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    // For other errors, propagate to the caller
    return Promise.reject(error);
  },
);

export default apiInstance;
