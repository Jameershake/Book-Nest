import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  withCredentials: true, // optional
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('userInfo') || 'null');
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default api;
