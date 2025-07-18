import { APP_PATHS } from '@/app-paths.enum.ts';
import { AuthGuard } from '@/guards/AuthGuard.tsx';
import { RoleGuard } from '@/guards/RolesGuard.tsx';
import { MainLayout } from '@/layouts/MainLayout';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Role } from '../role.enum.ts';

const AddProjectPage = lazy(() => import('@/pages/AddProject/AddProjectPage.tsx'));
const EmployeesPage = lazy(() => import('@/pages/Employees/EmployeesPage.tsx'));
const HomePage = lazy(() => import('@/pages/Home/HomePage.tsx'));
const LoginPage = lazy(() => import('@/pages/Login/LoginPage.tsx'));
const ProjectDetailsPage = lazy(() => import('@/pages/ProjectDetails/ProjectDetailsPage.tsx'));
const ProjectsPage = lazy(() => import('@/pages/Projects/ProjectsPage.tsx'));
const SignupPage = lazy(() => import('@/pages/Signup/SignupPage.tsx'));
const TaskDetailsPage = lazy(() => import('@/pages/TaskDetails/TaskDetailsPage.tsx'));
const TasksPage = lazy(() => import('@/pages/Tasks/TasksPage.tsx'));
const UsersProfilePage = lazy(() => import('@/pages/UsersProfile/UsersProfilePage.tsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: APP_PATHS.HOME,
        element: (
          <AuthGuard>
            <RoleGuard allowedRoles={[`${Role.ADMIN}`]}>
              <HomePage />
            </RoleGuard>
          </AuthGuard>
        ),
      },
      {
        path: APP_PATHS.PROJECTS,
        children: [
          {
            path: '',
            element: (
              <AuthGuard>
                <ProjectsPage />
              </AuthGuard>
            ),
            children: [
              {
                path: `:projectId/${APP_PATHS.PROJECT_TASKS}`,
                children: [
                  {
                    path: '',
                    element: (
                      <AuthGuard>
                        <TasksPage />
                      </AuthGuard>
                    ),
                  },
                  {
                    path: `:taskId/${APP_PATHS.TASK_DETAILS}`,
                    element: (
                      <AuthGuard>
                        <TaskDetailsPage />
                      </AuthGuard>
                    ),
                  },
                ],
              },
            ],
          },
          {
            path: `:projectId/${APP_PATHS.PROJECT_DETAILS}`,
            element: (
              <AuthGuard>
                <ProjectDetailsPage />
              </AuthGuard>
            ),
            children: [
              {
                path: '',
                element: (
                  <AuthGuard>
                    <TasksPage />
                  </AuthGuard>
                ),
              },
              {
                path: `:taskId/${APP_PATHS.TASK_DETAILS}`,
                element: (
                  <AuthGuard>
                    <TaskDetailsPage />
                  </AuthGuard>
                ),
              },
            ],
          },
          {
            path: APP_PATHS.ADD_PROJECT,
            element: (
              <AuthGuard>
                <AddProjectPage />
              </AuthGuard>
            ),
          },
        ],
      },
      {
        path: APP_PATHS.EMPLOYEES,
        element: (
          <AuthGuard>
            <EmployeesPage />
          </AuthGuard>
        ),
      },
      {
        path: APP_PATHS.MY_PROFILE,
        element: (
          <AuthGuard>
            <UsersProfilePage />
          </AuthGuard>
        ),
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
