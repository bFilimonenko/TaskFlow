import { useProjects } from '@/contexts/ProjectsContext';
import { PRIORITY } from '@/contexts/ProjectsContext/context.tsx';
import { Calendar } from 'lucide-react';

const priorityColors: Record<PRIORITY, string> = {
  [PRIORITY.LOW]: 'text-green-500',
  [PRIORITY.MEDIUM]: 'text-yellow-500',
  [PRIORITY.HIGH]: 'text-red-500',
};

export const ProjectDetails = () => {
  const { currentProject } = useProjects();

  return (
    <div className="grid gap-3 h-full bg-white w-73 rounded-3xl overflow-hidden p-3">
      <h3 className="font-bold">Description</h3>
      <p>{currentProject?.description}</p>

      <span className="text-gray-400 text-sm">Priority</span>
      <p className={priorityColors[currentProject?.priority as PRIORITY]}>
        {currentProject?.priority}
      </p>
      <span className="text-gray-400 text-sm">Dead Line</span>
      <p className=" flex text-gray-500">
        <Calendar /> Created {new Date(`${currentProject?.starts}`).toLocaleDateString()}
      </p>
    </div>
  );
};
