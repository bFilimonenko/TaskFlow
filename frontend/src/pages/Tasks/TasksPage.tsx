import { EmptyTasksList } from '@/components/TasksList/EmptyTasksList.tsx';
import { TasksList } from '@/components/TasksList/TasksList.tsx';
import { useProjects } from '@/contexts/ProjectsContext';

const TasksPage = () => {
  const { currentProjectTasks } = useProjects();

  if (!currentProjectTasks) {
    return <div>loading...</div>;
  }
  return !currentProjectTasks.length ? <EmptyTasksList /> : <TasksList />;
};

export default TasksPage;
