import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';

export const logoutRequest = async ({
  id,
  refreshToken,
}: {
  id: string;
  refreshToken: string | null;
}) => {
  if (!refreshToken || !id) return null;

  return instance.post(API_ENDPOINTS.AUTH_LOGOUT, { id, refreshToken });
};
