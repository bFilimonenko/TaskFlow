import { EmployeesList } from '@/components/EmployeesList/EmployeesList.tsx';
import { useEmployees } from '@/contexts/EmployeesContext';

const EmployeesPage = () => {
  const { employees } = useEmployees();
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="w-auto flex justify-between mb-6 ml-10">
        <h1 className="text-4xl font-bold ">Employees ({employees?.length})</h1>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0">
        <EmployeesList />
      </div>
    </div>
  );
};

export default EmployeesPage;
