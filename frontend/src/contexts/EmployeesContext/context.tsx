import type { User } from '@/contexts/AuthContext/context.tsx';
import { createContext } from 'react';

type EmployeesContextType = {
  employees: User[] | null;
  employeesIsLoading: boolean;
};

export const EmployeesContext = createContext<EmployeesContextType>({
  employees: null,
  employeesIsLoading: true,
});
