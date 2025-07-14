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

export enum STATUS {
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  IN_REVIEW = 'In Review',
  DONE = 'Done',
}

export const statusColors: Record<STATUS, string> = {
  [STATUS.TO_DO]: 'text-gray-600 bg-gray-600/10',
  [STATUS.IN_PROGRESS]: 'text-blue-500 bg-blue-500/10',
  [STATUS.IN_REVIEW]: 'text-purple-600 bg-purple-600/10',
  [STATUS.DONE]: 'text-green-500 bg-green-500/10',
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
  status: STATUS;
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
