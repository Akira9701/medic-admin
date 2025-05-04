import axios from 'axios';

// Create base API instance
const apiInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiInstance;
