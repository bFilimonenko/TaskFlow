import { APP_PATHS } from '@/app-paths.enum.ts';
import { Home, Layers, Users } from 'lucide-react';

export const NAVIGATION = [
  {
    title: 'Home',
    url: APP_PATHS.HOME,
    icon: Home,
  },
  {
    title: 'Projects',
    url: APP_PATHS.PROJECTS,
    icon: Layers,
  },
  {
    title: 'Employees',
    url: APP_PATHS.EMPLOYEES,
    icon: Users,
  },
];
