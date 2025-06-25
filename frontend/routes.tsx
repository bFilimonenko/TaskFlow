import LoginPage from '@/pages/Login/LoginPage.tsx';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
export const isAuth = false;

export const router = createBrowserRouter([
  {
    path: '/',
    element: isAuth ? <MainLayout /> : <LoginPage/>,
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
