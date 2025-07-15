import {
  createTaskRequest,
  editTaskRequest,
  getProjectRequest,
  getProjectsRequest,
  getTaskRequest,
} from '@/api';
import { createProjectRequest } from '@/api/projects/createProject.ts';
import { editProjectRequest } from '@/api/projects/editProject.ts';
import { getProjectTasksRequest } from '@/api/projects/getProjectTasks.ts';
import type { IProjectForm } from '@/components/ProjectForm/ProjectForm.tsx';
import type { ITaskForm } from '@/components/TaskForm/TaskForm.tsx';
import { ProjectsContext } from '@/contexts/ProjectsContext/context.tsx';
import {
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { type FC, type PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ProjectsProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const { projectId, taskId } = useParams();

  const { data: projects, isFetching } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjectsRequest,
  });

  const { data: currentProject } = useQuery({
    queryKey: ['currentProject', projectId],
    queryFn: () => getProjectRequest(projectId),
    enabled: !!projectId,
  });

  const createProject: UseMutationResult<any, Error, IProjectForm, unknown> | null = useMutation({
    mutationFn: createProjectRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Add project successfully.');
    },
  });

  const updateProject = useMutation({
    mutationFn: ({ id, values }: { id: number; values: IProjectForm }) =>
      editProjectRequest(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentProject', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Update project successfully.');
    },
  });

  // const { data: tasks } = useQuery({ queryKey: ['tasks'], queryFn: getTasksRequest });

  const { data: currentProjectTasks } = useQuery({
    queryFn: () => getProjectTasksRequest(projectId),
    queryKey: ['currentProjectTasks', projectId],
    enabled: !!projectId,
  });

  const { data: currentTask } = useQuery({
    queryKey: ['currentTask', taskId],
    queryFn: () => getTaskRequest(taskId),
    enabled: !!taskId,
  });

  const createTask = useMutation({
    mutationFn: ({ id, values }: { id: number; values: ITaskForm }) =>
      createTaskRequest(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentProjectTasks'] });
      toast.success('Add task successfully.');
    },
  });

  const updateTask = useMutation({
    mutationFn: ({ id, values }: { id: number; values: ITaskForm }) => editTaskRequest(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentTask', taskId] });
      queryClient.invalidateQueries({ queryKey: ['currentProjectTasks'] });
      toast.success('Update task successfully.');
    },
  });

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        isLoading: isFetching,
        createProject,
        updateProject,
        currentProject,
        currentProjectTasks,
        currentTask,
        createTask,
        updateTask,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
