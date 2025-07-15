import { getEmployeesByIdsRequest } from '@/api/employees';
import { getEmployeesRequest } from '@/api/employees/getEmployees.ts';
import { EmployeesContext } from '@/contexts/EmployeesContext/context.tsx';
import { useQuery } from '@tanstack/react-query';
import { type FC, type PropsWithChildren, useState } from 'react';

export const EmployeesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [employeeIdsToFetch, setEmployeeIdsToFetch] = useState<number[]>([]);

  const { data: employees, isFetching: employeesIsLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployeesRequest,
  });

  const { data: selectedEmployees, refetch: refetchSelectedEmployees } = useQuery({
    queryKey: ['employeesByIds', employeeIdsToFetch],
    queryFn: () => getEmployeesByIdsRequest(employeeIdsToFetch),
    enabled: employeeIdsToFetch.length > 0,
  });

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        employeesIsLoading,
        selectedEmployees,
        refetchSelectedEmployees,
        setEmployeeIdsToFetch,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};
