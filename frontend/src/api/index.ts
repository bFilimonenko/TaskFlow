import axios from 'axios';
import { toast } from 'react-toastify';

export const instance = axios.create({
  baseURL: import.meta.env.API_URL,
  timeout: 1000,
});

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    toast.error(error.response.data.message);
    return Promise.reject(error);
  },
);

instance.interceptors.request.use(function(config) {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export * from './auth';
