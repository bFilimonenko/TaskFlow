import { TaskDetails } from '@/components/TaskDetails/TaskDetails.tsx';
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
import { Edit } from 'lucide-react';
import { useState } from 'react';

const TaskDetailsPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { currentTask, updateTask } = useProjects();

  if (!currentTask) return null;

  return (
    <div className="w-3/4 h-full relative flex flex-col min-h-0">
      <div className="flex flex-row mb-5">
        <h2 className="font-bold text-xl">Task Details</h2>

        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen((prev) => !prev)}>
          <DialogTrigger asChild>
            <Button className="absolute top-0 right-0 bg-white" variant="secondary" size="icon">
              <Edit />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl">Edit Task</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <TaskForm
                submitCallback={() => setDialogOpen(false)}
                editValues={{
                  ...currentTask,
                  users: currentTask.users.map((user) => user.id),
                }}
                formAction={(values: ITaskForm) => {
                  updateTask?.mutate({
                    id: currentTask.id,
                    values,
                  });
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <TaskDetails />
    </div>
  );
};

export default TaskDetailsPage;
