import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';
import type { IAddTaskForm } from '@/components/AddTask/AddTask.tsx';

export const createTaskRequest = async (id: number, addTaskValues: IAddTaskForm) => {
  // if (!localStorage.getItem('accessToken')) {
  //   return null;
  // }
  const response = await instance.post(
    API_ENDPOINTS.CREATE_TASK.replace(':id', `${id}`),
    addTaskValues,
  );
  return response.data;
};
