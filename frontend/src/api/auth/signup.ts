import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';
import type { ISignupForm } from '@/components/Signup/Signup.tsx';

export const signupRequest = async (signupValues: ISignupForm) => {
  const response = await instance.post(API_ENDPOINTS.AUTH_SIGNUP, signupValues);
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data;
};
