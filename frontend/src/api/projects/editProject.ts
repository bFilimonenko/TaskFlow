import { instance } from '@/api';
import { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';
import { generateDynamicPath } from '@/api/utils.tsx';
import type { IProjectForm } from '@/components/ProjectForm/ProjectForm.tsx';

export const editProjectRequest = async (id: number, updatedValues: IProjectForm) => {
  // if (!localStorage.getItem('accessToken')) {
  //   return null;
  // }
  const response = await instance.patch(
    generateDynamicPath(API_ENDPOINTS.PROJECT_BY_ID, id),
    updatedValues,
  );
  return response.data;
};
