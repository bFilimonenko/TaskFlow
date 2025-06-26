import { instance } from '@/api';

export const loginRequest = async (loginValues: { email: string; password: string }) => {
  const response = await instance.post('auth/login', loginValues);
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data;
};
