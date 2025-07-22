import { EmployeesContext } from '@/contexts/EmployeesContext/context.tsx';
import { useContext } from 'react';

export const useEmployees = () => useContext(EmployeesContext);
