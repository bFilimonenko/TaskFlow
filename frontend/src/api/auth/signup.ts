import { instance } from '@/api';
import type { ISignupForm } from '@/components/Signup/Signup.tsx';

export const signupRequest = async (signupValues: ISignupForm) => {
  const response = await instance.post('auth/signup', signupValues);
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data;
};
