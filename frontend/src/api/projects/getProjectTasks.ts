import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';
import { generateDynamicPath } from '@/api/utils.tsx';

export const getProjectTasksRequest = async (id?: string) => {
  if (!id) return null;

  const response = await instance.get(generateDynamicPath(API_ENDPOINTS.PROJECT_TASKS, id));
  return response.data;
};
