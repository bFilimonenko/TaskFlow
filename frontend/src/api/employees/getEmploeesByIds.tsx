import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';

export const getEmployeesByIdsRequest = async (ids: number[]) => {
  if (!ids) return null;

  const response = await instance.post(API_ENDPOINTS.EMPLOYEES_BY_IDS, ids);
  return response.data;
};
