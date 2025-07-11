import { createTaskRequest, getProjectsRequest } from '@/api';
import { createProjectRequest } from '@/api/projects/createProject.ts';
import { getProjectTasksRequest } from '@/api/projects/getProjectTasks.ts';
import type { IAddProjectForm } from '@/components/AddProject/AddProject.tsx';
import type { IAddTaskForm } from '@/components/AddTask/AddTask.tsx';
import { type Project, ProjectsContext } from '@/contexts/ProjectsContext/context.tsx';
import {
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { type FC, type PropsWithChildren, useState } from 'react';
import { toast } from 'react-toastify';

export const ProjectsProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const { data: projects, isFetching } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjectsRequest,
  });

  const createProject: UseMutationResult<any, Error, IAddProjectForm, unknown> | null = useMutation(
    {
      mutationFn: createProjectRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        toast.success('Add project successfully.');
      },
    },
  );

  // const { data: tasks } = useQuery({ queryKey: ['tasks'], queryFn: getTasksRequest });

  const getProjectTasks = useMutation({
    mutationFn: getProjectTasksRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentProjectTasks'] });
    },
  });

  const createTask = useMutation({
    mutationFn: ({ id, values }: { id: number; values: IAddTaskForm }) =>
      createTaskRequest(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentProjectTasks'] });
      toast.success('Add task successfully.');
    },
  });

  const { data: currentProjectTasks } = useQuery({
    queryKey: ['currentProjectTasks', currentProject],
    queryFn: () => getProjectTasksRequest(currentProject?.id as number),
    enabled: currentProject !== null,
  });

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        isLoading: isFetching,
        createProject,
        currentProject,
        setCurrentProject,
        getProjectTasks,
        currentProjectTasks,
        createTask,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
