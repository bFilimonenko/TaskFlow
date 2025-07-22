import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';
import { generateDynamicPath } from '@/api/utils.tsx';
import type { ITaskForm } from '@/components/TaskForm/TaskForm.tsx';

export const editTaskRequest = async (id: number, updatedValues: ITaskForm) => {
  // if (!localStorage.getItem('accessToken')) {
  //   return null;
  // }
  const response = await instance.patch(
    generateDynamicPath(API_ENDPOINTS.TASK_BY_ID, id),
    updatedValues,
  );
  return response.data;
};
