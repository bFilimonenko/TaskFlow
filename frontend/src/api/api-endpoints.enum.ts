export enum API_ENDPOINTS {
  AUTH_SIGNUP = 'auth/signup',
  AUTH_LOGIN = 'auth/login',
  USER_ME = 'users/me',

  PROJECTS = 'projects',
  PROJECT_BY_ID = 'projects/:id',
  PROJECT_TASKS = 'projects/:id/tasks',

  TASKS = 'tasks',
  TASK_BY_ID = 'tasks/:id',

  EMPLOYEES = 'users',
  EMPLOYEE_BY_ID = 'users/:id',
  EMPLOYEES_BY_IDS = 'users/some',
}
