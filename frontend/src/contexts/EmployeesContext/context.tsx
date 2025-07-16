import type { User } from '@/contexts/AuthContext/context.tsx';
import { createContext } from 'react';

type EmployeesContextType = {
  employees: User[] | null;
  employeesIsLoading: boolean;
  selectedEmployees: User[] | undefined;
  refetchSelectedEmployees: () => void;
  setEmployeeIdsToFetch: (ids: number[]) => void;
};

export const EmployeesContext = createContext<EmployeesContextType>({
  employees: null,
  employeesIsLoading: true,
  selectedEmployees: undefined,
  refetchSelectedEmployees: () => {},
  setEmployeeIdsToFetch: () => {},
});
