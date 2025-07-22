import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';
import { generateDynamicPath } from '@/api/utils.tsx';
import type { Role } from '../../../role.enum.ts';

export const changeRoleRequest = async ({ id, role }: { id: string; role: Role }) => {
  const response = await instance.patch(
    generateDynamicPath(API_ENDPOINTS.ADMIN_EMPLOYEE_ROLE, id),
    { role },
  );
  return response.data;
};
