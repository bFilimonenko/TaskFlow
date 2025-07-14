import type { IProjectForm } from '@/components/ProjectForm/ProjectForm.tsx';
import type { ITaskForm } from '@/components/TaskForm/TaskForm.tsx';
import type { User } from '@/contexts/AuthContext/context.tsx';
import type { UseMutationResult } from '@tanstack/react-query';
import { createContext } from 'react';

export enum PRIORITY {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export const priorityColors: Record<PRIORITY, string> = {
  [PRIORITY.LOW]: 'text-green-500',
  [PRIORITY.MEDIUM]: 'text-yellow-500',
  [PRIORITY.HIGH]: 'text-red-500',
};

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
  users: User[];
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
  currentTask: Task | null;
  createTask: UseMutationResult<any, Error, { id: number; values: ITaskForm }, unknown> | null;
  updateTask: UseMutationResult<any, Error, { id: number; values: ITaskForm }, unknown> | null;
};

export const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  isLoading: true,
  createProject: null,
  updateProject: null,
  currentProject: null,
  currentProjectTasks: [],
  currentTask: null,
  createTask: null,
  updateTask: null,
});
