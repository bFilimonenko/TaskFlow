import { APP_PATHS } from '@/app-paths.enum.ts';
import { Calendar, Home, Layers, Settings, Users } from 'lucide-react';

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
    title: 'Calendar',
    url: APP_PATHS.CALENDAR,
    icon: Calendar,
  },
  {
    title: 'Employees',
    url: APP_PATHS.EMPLOYEES,
    icon: Users,
  },
  {
    title: 'Settings',
    url: APP_PATHS.SETTINGS,
    icon: Settings,
  },
];
