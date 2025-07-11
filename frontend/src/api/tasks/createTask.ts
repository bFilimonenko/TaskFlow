import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';
import { generateDynamicPath } from '@/api/utils.tsx';
import type { IAddTaskForm } from '@/components/AddTask/AddTask.tsx';

export const createTaskRequest = async (id: number, addTaskValues: IAddTaskForm) => {
  // if (!localStorage.getItem('accessToken')) {
  //   return null;
  // }
  const response = await instance.post(
    generateDynamicPath(API_ENDPOINTS.CREATE_TASK, id),
    addTaskValues,
  );
  return response.data;
};
