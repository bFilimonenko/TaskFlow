import type { IAddProjectForm } from '@/components/AddProject/AddProject.tsx';
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

type ProjectsContextType = {
  projects: Project[];
  isLoading: boolean;
  createProject: UseMutationResult<any, Error, IAddProjectForm, unknown> | null;
};

export const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  isLoading: true,
  createProject: null,
});
