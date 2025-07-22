import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';
import { generateDynamicPath } from '@/api/utils.tsx';
import type { ITaskForm } from '@/components/TaskForm/TaskForm.tsx';

export const createTaskRequest = async (id: number, addTaskValues: ITaskForm) => {
  // if (!localStorage.getItem('accessToken')) {
  //   return null;
  // }
  const response = await instance.post(
    generateDynamicPath(API_ENDPOINTS.TASK_BY_ID, id),
    addTaskValues,
  );
  return response.data;
};
