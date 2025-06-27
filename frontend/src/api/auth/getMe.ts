import { instance } from '@/api';

export const getMe = async () => {
  if (!localStorage.getItem('accessToken')) {
    return null;
  }
  const response = await instance.get('users/me');
  return response.data;
};
