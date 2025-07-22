import { useContext } from 'react';
import { ProjectsContext } from './context.jsx';

export const useProjects = () => useContext(ProjectsContext);
