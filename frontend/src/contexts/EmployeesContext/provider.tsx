import { changeRoleRequest } from '@/api/admin';
import { editUserProfileRequest, getEmployeesByIdsRequest } from '@/api/employees';
import { getEmployeesRequest } from '@/api/employees/getEmployees.ts';
import type { User } from '@/contexts/AuthContext/context.tsx';
import { EmployeesContext } from '@/contexts/EmployeesContext/context.tsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type FC, type PropsWithChildren, useState } from 'react';
import { toast } from 'react-toastify';
import type { Role } from '../../../role.enum.ts';

export const EmployeesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [employeeIdsToFetch, setEmployeeIdsToFetch] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const { data: employees, isFetching: employeesIsLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployeesRequest,
  });

  const { data: selectedEmployees, refetch: refetchSelectedEmployees } = useQuery({
    queryKey: ['employeesByIds', employeeIdsToFetch],
    queryFn: () => getEmployeesByIdsRequest(employeeIdsToFetch),
    enabled: employeeIdsToFetch.length > 0,
  });

  const changeRole = useMutation({
    mutationFn: ({ id, role }: { id: string; role: Role }) => changeRoleRequest({ id, role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('Update employee role successfully.');
    },
  });

  const editUserProfile = useMutation({
    mutationFn: ({ id, userValues }: { id: number; userValues: User }) =>
      editUserProfileRequest({ id, userValues }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Update your profile successfully.');
    },
  });

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        employeesIsLoading,
        selectedEmployees,
        refetchSelectedEmployees,
        setEmployeeIdsToFetch,
        changeRole,
        editUserProfile,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};
