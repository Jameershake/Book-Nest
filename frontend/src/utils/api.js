// src/api.js
import axios from 'axios';

// Create axios instance using environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. https://book-nest-z1lz.onrender.com/api
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach Bearer token if user is logged in
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('userInfo') || 'null');
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
