import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';

export const loginRequest = async (loginValues: { email: string; password: string }) => {
  const response = await instance.post(API_ENDPOINTS.AUTH_LOGIN, loginValues);
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data;
};
