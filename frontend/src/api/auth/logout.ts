import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';

export const logoutRequest = async (refreshToken: string | null) => {
  if (!refreshToken) {
    throw new Error('No refresh token provided');
  }
  return instance.post(API_ENDPOINTS.AUTH_LOGOUT, { refreshToken });
};
