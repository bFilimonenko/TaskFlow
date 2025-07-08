import { EmployeeCard } from '@/components/EmployeesList/EmployeeCard.tsx';
import { EmployeesLoading } from '@/components/EmployeesList/EmployeesLoading.tsx';
import { useEmployees } from '@/contexts/EmployeesContext';

export const EmployeesList = () => {
  const { employees, employeesIsLoading } = useEmployees();
  console.log(employees);
  if (employeesIsLoading || !employees) {
    return <EmployeesLoading />;
  }
  return (
    <div className="grid gap-5">
      {employees.map((employee) => (
        <EmployeeCard employee={employee} />
      ))}
    </div>
  );
};
