import { getEmployeesRequest } from '@/api/employees/getEmployees.ts';
import { EmployeesContext } from '@/contexts/EmployeesContext/context.tsx';
import { useQuery } from '@tanstack/react-query';
import { type FC, type PropsWithChildren } from 'react';

export const EmployeesProvider: FC<PropsWithChildren> = ({ children }) => {

  const { data: employees, isFetching: employeesIsLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployeesRequest,
  });
  console.log(employees);
  console.log(employeesIsLoading);

  return (
    <EmployeesContext.Provider value={{ employees, employeesIsLoading }}>
      {children}
    </EmployeesContext.Provider>
  );
};
