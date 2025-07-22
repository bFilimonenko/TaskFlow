export enum API_ENDPOINTS {
  AUTH_SIGNUP = 'auth/signup',
  AUTH_LOGIN = 'auth/login',
  AUTH_LOGOUT = 'auth/logout',
  USER_ME = 'users/me',
  AUTH_REFRESH = 'auth/refresh',

  PROJECTS = 'projects',
  PROJECT_BY_ID = 'projects/:id',
  PROJECT_TASKS = 'projects/:id/tasks',
  PROJECT_TASKS_FILTER = 'projects/:id/tasks/filter',

  TASKS = 'tasks',
  TASK_BY_ID = 'tasks/:id',

  EMPLOYEES = 'users',
  EMPLOYEE_BY_ID = 'users/:id',
  EMPLOYEES_BY_IDS = 'users/some',

  ADMIN_EMPLOYEE_ROLE = 'users/admin/:id',
}
