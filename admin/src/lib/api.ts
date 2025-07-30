// lib/adminApi.ts
import axios, { type AxiosInstance } from 'axios';
import { getAdminApiConfig } from './config';
import { toast } from 'sonner';

const { baseURL } = getAdminApiConfig();

const adminApi: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

adminApi.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem('auth-storage'); // or from Zustand
    if (authData) {
      try {
        const parseData = JSON.parse(authData);
        const token = parseData.state?.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      toast.error('Network error. Please check your connection.');
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default adminApi;
