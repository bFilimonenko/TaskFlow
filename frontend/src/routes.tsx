import { APP_PATHS } from '@/app-paths.enum.ts';
import { MainLayout } from '@/layouts/MainLayout';
import { createBrowserRouter } from 'react-router-dom';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: APP_PATHS.HOME,
        element: <>HOME</>,
      },
      {
        path: APP_PATHS.PROJECTS,
        element: <>PROJECTS</>,
      },
      {
        path: APP_PATHS.CALENDAR,
        element: <>CALENDAR</>,
      },
      {
        path: APP_PATHS.EMPLOYEES,
        element: <>EMPLOYEES</>,
      },
      {
        path: APP_PATHS.SETTINGS,
        element: <>SETTINGS</>,
      },
      {
        path: '/*',
        element: <h1>oops, something went wrong</h1>,
      },
    ],
  },
]);
