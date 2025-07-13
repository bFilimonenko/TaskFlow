import { getSomeEmployeesRequest } from '@/api/employees';
import { getEmployeesRequest } from '@/api/employees/getEmployees.ts';
import { EmployeesContext } from '@/contexts/EmployeesContext/context.tsx';
import { useProjects } from '@/contexts/ProjectsContext';
import { useQuery } from '@tanstack/react-query';
import { type FC, type PropsWithChildren } from 'react';

export const EmployeesProvider: FC<PropsWithChildren> = ({ children }) => {
  const { currentTask } = useProjects();

  const { data: employees, isFetching: employeesIsLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployeesRequest,
  });

  const { data: currentEmployees } = useQuery({
    queryKey: ['currentEmployees', currentTask],
    queryFn: () => getSomeEmployeesRequest(currentTask!.users),
    enabled: !!currentTask && !!currentTask.users && currentTask.users.length > 0,
  });

  return (
    <EmployeesContext.Provider value={{ employees, employeesIsLoading, currentEmployees }}>
      {children}
    </EmployeesContext.Provider>
  );
};
