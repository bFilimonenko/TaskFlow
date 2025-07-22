import type { User } from '@/contexts/AuthContext/context.tsx';
import type { UseMutationResult } from '@tanstack/react-query';
import { createContext } from 'react';
import type { Role } from '../../../role.enum.ts';

type EmployeesContextType = {
  employees: User[] | null;
  employeesIsLoading: boolean;
  selectedEmployees: User[] | undefined;
  refetchSelectedEmployees: () => void;
  setEmployeeIdsToFetch: (ids: number[]) => void;
  changeRole: UseMutationResult<any, Error, { id: string; role: Role }, unknown> | null;
  editUserProfile: UseMutationResult<any, Error, { id: number; userValues: User }, unknown> | null;
};

export const EmployeesContext = createContext<EmployeesContextType>({
  employees: null,
  employeesIsLoading: true,
  selectedEmployees: undefined,
  refetchSelectedEmployees: () => {},
  setEmployeeIdsToFetch: () => {},
  changeRole: null,
  editUserProfile: null,
});
