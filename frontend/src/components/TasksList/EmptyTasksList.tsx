import searchForTasks from '/search-for-tasks.webp';
import { type ITaskForm, TaskForm } from '@/components/TaskForm/TaskForm.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { useProjects } from '@/contexts/ProjectsContext';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export const EmptyTasksList = () => {
  const { currentProject, createTask } = useProjects();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!currentProject) return null;

  return (
    <div className="flex flex-col gap-5 items-center mx-auto">
      <img src={searchForTasks} alt="no tasks" />
      <h2 className="font-bold text-2xl">There are no tasks in this project yet Let's add them</h2>
      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen((prev) => !prev)}>
        <DialogTrigger asChild>
          <Button variant="custom" size="custom">
            <Plus />
            Add Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <TaskForm
            formAction={(values: ITaskForm) => {
              createTask?.mutate({
                id: currentProject?.id,
                values: values,
              });
            }}
            submitCallback={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
