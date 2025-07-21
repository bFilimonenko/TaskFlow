import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';
import { generateDynamicPath } from '@/api/utils.tsx';
import type { User } from '@/contexts/AuthContext/context.tsx';

export const editUserProfileRequest = async ({
  id,
  userValues,
}: {
  id: number;
  userValues: User;
}) => {
  const response = await instance.patch(
    generateDynamicPath(API_ENDPOINTS.EMPLOYEE_BY_ID, id),
    userValues,
  );
  return response.data;
};
