import { TaskCard } from '@/components/TasksList/TaskCard.tsx';
import { useProjects } from '@/contexts/ProjectsContext';

export const TasksList = () => {
  const { currentProjectTasks } = useProjects();

  return (
    <div className="flex flex-col gap-2 py-1 overflow-y-auto min-h-0">
      {currentProjectTasks.map((task, index) => (
        <TaskCard key={index} task={task} />
      ))}
    </div>
  );
};
