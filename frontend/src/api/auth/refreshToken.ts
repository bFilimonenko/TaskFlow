import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';

export const refreshTokenRequest = async () => {
  const token = localStorage.getItem('refreshToken');
  const response = await instance.post(API_ENDPOINTS.AUTH_REFRESH, {
    token,
  });

  return response;
};
