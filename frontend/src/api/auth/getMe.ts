import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';

export const getMe = async () => {
  if (!localStorage.getItem('accessToken')) {
    return null;
  }
  const response = await instance.get(API_ENDPOINTS.USER_ME);
  return response.data;
};
