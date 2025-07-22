import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';
import type { IProjectForm } from '@/components/ProjectForm/ProjectForm.tsx';

export const createProjectRequest = async (addProjectValues: IProjectForm) => {
  // if (!localStorage.getItem('accessToken')) {
  //   return null;
  // }
  const response = await instance.post(API_ENDPOINTS.PROJECTS, addProjectValues);
  return response.data;
};
