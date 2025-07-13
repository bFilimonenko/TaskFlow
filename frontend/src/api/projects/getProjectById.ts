import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';
import { generateDynamicPath } from '@/api/utils.tsx';

export const getProjectRequest = async (id?: string) => {
  if (!id) return null;

  const response = await instance.get(generateDynamicPath(API_ENDPOINTS.PROJECT_BY_ID, id));
  return response.data;
};
