import { useEmployees } from '@/contexts/EmployeesContext';
import { useProjects } from '@/contexts/ProjectsContext';
import { PRIORITY, priorityColors } from '@/contexts/ProjectsContext/context.tsx';
import { Avatar, AvatarFallback } from '../ui/avatar';

export const TaskDetails = () => {
  const { currentProject, currentTask } = useProjects();
  const { currentEmployees } = useEmployees();

  if (!currentTask) return null;

  return (
    <div className="flex flex-col gap-6 h-full bg-white rounded-3xl p-7">
      <div>
        <span className="text-gray-400 text-sm">
          PN{String(currentProject?.id).padStart(5, '0')}
        </span>
        <p className="text-lg font-bold mb-3">{currentTask.taskName}</p>
        <p>{currentTask.description}</p>
      </div>

      <div>
        <span className="text-gray-400 text-sm">Priority</span>
        <p className={priorityColors[currentProject?.priority as PRIORITY]}>
          {currentProject?.priority}
        </p>
      </div>
      <div>
        <span className="text-gray-400 text-sm">Assigned</span>
        <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background ">
          {currentEmployees?.map((employee) => (
            <Avatar className="size-8" key={employee.id}>
              <AvatarFallback>
                {employee.firstName.charAt(0)}
                {employee.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </div>
  );
};
