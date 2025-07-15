import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';
import { generateDynamicPath } from '@/api/utils.tsx';
import type { IFilterForm } from '@/components/FilterTasks/FilterTasks.tsx';

export const getFilteredTasksRequest = async (filters: IFilterForm, id?: string) => {
  if (!id) return null;

  const params = new URLSearchParams();

  if (filters.deadLine) params.append('deadLine', filters.deadLine.toISOString());
  if (filters.estimate) params.append('estimate', String(filters.estimate));
  if (filters.priority) params.append('priority', filters.priority);
  if (filters.status) params.append('status', filters.status);
  if (filters.users?.length) {
    filters.users.forEach((userId) => {
      params.append('users', String(userId));
    });
  }

  const url = `${generateDynamicPath(API_ENDPOINTS.PROJECT_TASKS_FILTER, id)}?${params.toString()}`;

  const response = await instance.get(url);
  return response.data;
};
