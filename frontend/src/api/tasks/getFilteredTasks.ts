import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';
import { generateDynamicPath } from '@/api/utils.tsx';
import type { IFilterForm } from '@/components/FilterTasks/FilterTasks.tsx';

export const getFilteredTasksRequest = async (filters: IFilterForm, id?: string) => {
  if (!id) return null;

  const url = `${generateDynamicPath(API_ENDPOINTS.PROJECT_TASKS_FILTER, id)}`;

  const response = await instance.get(url, {
    params: filters,
  });
  return response.data;
};
