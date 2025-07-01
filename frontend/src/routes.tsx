import { APP_PATHS } from '@/app-paths.enum.ts';
import { AddProject } from '@/components/AddProject/AddProject.tsx';
import { AuthGuard } from '@/guards/AuthGuard.tsx';
import { MainLayout } from '@/layouts/MainLayout';
import HomePage from '@/pages/Home/HomePage.tsx';
import LoginPage from '@/pages/Login/LoginPage.tsx';
import ProjectsPage from '@/pages/Projects/ProjectsPage.tsx';
import SignupPage from '@/pages/Signup/SignupPage.tsx';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: APP_PATHS.HOME,
        element: (
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        ),
      },
      {
        path: APP_PATHS.PROJECTS,
        children: [
          {
            path: '',
            element: <ProjectsPage />,
          },
          {
            path: `${APP_PATHS.ADD_PROJECT}`,
            element: <AddProject />,
          },
        ],
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
  {
    path: APP_PATHS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: APP_PATHS.SIGNUP,
    element: <SignupPage />,
  },
]);
