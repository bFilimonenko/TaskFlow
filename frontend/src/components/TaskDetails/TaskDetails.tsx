import { StatusDropdownMenu } from '@/components/StatusDropdownMenu/StatusDropdownMenu.tsx';
import { useProjects } from '@/contexts/ProjectsContext';
import { PRIORITY, priorityColors } from '@/contexts/ProjectsContext/context.tsx';
import { Avatar, AvatarFallback } from '../ui/avatar';

export const TaskDetails = () => {
  const { currentProject, currentTask } = useProjects();

  if (!currentTask) return null;

  return (
    <div className="flex flex-col gap-6 h-full bg-white rounded-3xl p-7">
      <div className="relative">
        <span className="text-gray-400 text-sm">
          PN{String(currentProject?.id).padStart(5, '0')}
        </span>
        <p className="text-lg font-bold mb-3">{currentTask.taskName}</p>
        <p>{currentTask.description}</p>
        <StatusDropdownMenu />
      </div>
      <div>
        <span className="text-gray-400 text-sm">Priority</span>
        <p className={priorityColors[currentTask.priority as PRIORITY]}>{currentTask.priority}</p>
      </div>
      <div>
        <span className="text-gray-400 text-sm">Assigned</span>
        <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background ">
          {currentTask.users.map((employee) => (
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
