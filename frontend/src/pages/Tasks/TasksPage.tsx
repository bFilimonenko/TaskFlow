import { EmptyTasksList } from '@/components/TasksList/EmptyTasksList.tsx';
import { TasksList } from '@/components/TasksList/TasksList.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useProjects } from '@/contexts/ProjectsContext';
import { Filter } from 'lucide-react';

const TasksPage = () => {
  const { currentProjectTasks } = useProjects();

  if (!currentProjectTasks) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-3/4 relative">
      <h2 className="font-bold text-2xl mb-4">Tasks</h2>
      <Button
        className="absolute top-0 right-3 bg-white hover:shadow-md"
        variant="secondary"
        size="icon"
      >
        <Filter />
      </Button>
      {!currentProjectTasks.length ? <EmptyTasksList /> : <TasksList />}
    </div>
  );
};

export default TasksPage;
