import { EmployeeCard } from '@/components/EmployeesList/EmployeeCard.tsx';
import { EmployeesLoading } from '@/components/EmployeesList/EmployeesLoading.tsx';
import { useEmployees } from '@/contexts/EmployeesContext';

export const EmployeesList = () => {
  const { employees, employeesIsLoading } = useEmployees();
  if (employeesIsLoading || !employees) {
    return <EmployeesLoading />;
  }
  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      <div className="grid gap-5">
        {employees.map((employee, index) => (
          <EmployeeCard key={index} employee={employee} />
        ))}
      </div>
    </div>
  );
};
