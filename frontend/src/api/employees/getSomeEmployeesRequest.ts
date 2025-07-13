import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';

export const getSomeEmployeesRequest = async (id?: number[]) => {
  if (!id) return null;
  const response = await instance.post(API_ENDPOINTS.EMPLOYEES_BY_IDS, id);
  return response.data;
};
