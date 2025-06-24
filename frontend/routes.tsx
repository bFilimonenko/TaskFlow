import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/home',
        element: <>HOME</>,
      },
      {
        path: '/projects',
        element: <>PROJECTS</>,
      },
      {
        path: '/calendar',
        element: <>CALENDAR</>,
      },
      {
        path: '/employees',
        element: <>EMPLOYEES</>,
      },
      {
        path: '/settings',
        element: <>SETTINGS</>,
      },
      {
        path: '/*',
        element: <h1>oops, something went wrong</h1>,
      },
    ],
  },
]);
