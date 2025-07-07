import type { IAddProjectForm } from '@/components/AddProject/AddProject.tsx';
import type { IAddTaskForm } from '@/components/AddTask/AddTask.tsx';
import type { UseMutationResult } from '@tanstack/react-query';
import { createContext, type Dispatch, type SetStateAction } from 'react';

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
  //   users
};

type ProjectsContextType = {
  projects: Project[];
  isLoading: boolean;
  createProject: UseMutationResult<any, Error, IAddProjectForm, unknown> | null;
  currentProject: Project | null;
  setCurrentProject: Dispatch<SetStateAction<Project | null>>;
  getProjectTasks: UseMutationResult<any, Error, any, unknown> | null;
  currentProjectTasks: Task[];
  createTask: UseMutationResult<any, Error, { id: number; values: IAddTaskForm }, unknown> | null;
};

export const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  isLoading: true,
  createProject: null,
  currentProject: null,
  setCurrentProject: () => null,
  getProjectTasks: null,
  currentProjectTasks: [],
  createTask: null,
});
