import { getProjectsRequest } from '@/api';
import { createProjectRequest } from '@/api/projects/createProject.ts';
import type { IAddProjectForm } from '@/components/AddProject/AddProject.tsx';
import { ProjectsContext } from '@/contexts/ProjectsContext/context.tsx';
import { useMutation, type UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { type FC, type PropsWithChildren } from 'react';

export const ProjectsProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({ queryKey: ['projects'], queryFn: getProjectsRequest });
  console.log(data);

  const createProject: UseMutationResult<any, Error, IAddProjectForm, unknown> | null = useMutation({
    mutationFn: createProjectRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return (
    <ProjectsContext.Provider value={{ projects: data, isLoading: isFetching, createProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};
