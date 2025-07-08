import { EmployeesList } from '@/components/EmployeesList/EmployeesList.tsx';
import { useEmployees } from '@/contexts/EmployeesContext';

const EmployeesPage = () => {
  const { employees } = useEmployees();
  return (
    <>
      <div className="w-full flex justify-between mb-6">
        <h1 className="text-4xl font-bold ">Employees ({employees?.length})</h1>
      </div>
      <EmployeesList />
    </>
  );
};

export default EmployeesPage;
