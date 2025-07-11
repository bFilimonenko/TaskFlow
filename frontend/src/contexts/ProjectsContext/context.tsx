import type { IAddTaskForm } from '@/components/AddTask/AddTask.tsx';
import type { IProjectForm } from '@/components/ProjectForm/ProjectForm.tsx';
import type { UseMutationResult } from '@tanstack/react-query';
import { createContext } from 'react';

export enum PRIORITY {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export type Project = {
  id: number;
  projectName: string;
  description?: string;
  priority: PRIORITY;
  starts: Date;
  deadLine: Date;
};

export type Task = {
  id: number;
  taskName: string;
  description?: string;
  priority: PRIORITY;
  estimate: number;
  deadLine: Date;
  users: number[];
};

type ProjectsContextType = {
  projects: Project[];
  isLoading: boolean;
  createProject: UseMutationResult<any, Error, IProjectForm, unknown> | null;
  updateProject: UseMutationResult<
    any,
    Error,
    { id: number; values: IProjectForm },
    unknown
  > | null;
  currentProject: Project | null;
  currentProjectTasks: Task[];
  createTask: UseMutationResult<any, Error, { id: number; values: IAddTaskForm }, unknown> | null;
};

export const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  isLoading: true,
  createProject: null,
  updateProject: null,
  currentProject: null,
  currentProjectTasks: [],
  createTask: null,
});
