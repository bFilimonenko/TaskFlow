import { FilterTasks } from '@/components/FilterTasks/FilterTasks.tsx';
import { Loading } from '@/components/Loading/Loading.tsx';
import { EmptyTasksList } from '@/components/TasksList/EmptyTasksList.tsx';
import { TasksList } from '@/components/TasksList/TasksList.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { useProjects } from '@/contexts/ProjectsContext';
import { Filter } from 'lucide-react';
import { useState } from 'react';

const TasksPage = () => {
  const { currentProjectTasks, taskFilters } = useProjects();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!currentProjectTasks) {
    return <Loading />;
  }

  const activeFiltersCount = Object.values(taskFilters).filter(Boolean).length;

  return (
    <div className="w-3/4 flex flex-col h-full relative">
      <h2 className="font-bold text-2xl mb-4 ">Tasks</h2>

      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen((prev) => !prev)}>
        <DialogTrigger asChild>
          <Button
            className="absolute top-0 right-3 bg-white hover:shadow-md"
            variant="secondary"
            size="icon"
          >
            <Filter />
            {activeFiltersCount > 0 && (
              <span className="absolute top-0 right-0 px-1 min-w-4 translate-x-1/3 -translate-y-1/3 origin-center flex items-center justify-center rounded-full text-xs bg-blue-300 text-destructive-foreground">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl">Filter</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto min-h-0">
            <FilterTasks submitCallback={() => setDialogOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>

      {!currentProjectTasks.length ? <EmptyTasksList /> : <TasksList />}
    </div>
  );
};

export default TasksPage;
