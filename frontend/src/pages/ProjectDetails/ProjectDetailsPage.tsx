import { APP_PATHS } from '@/app-paths.enum.ts';
import { ProjectDetails } from '@/components/ProjectDetails/ProjectDetails';
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
import { ArrowLeft, Plus } from 'lucide-react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProjectDetailsPage = () => {
  const navigate = useNavigate();
  const { currentProject, createTask } = useProjects();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!currentProject) return null;
  return (
    <div className="flex flex-col h-full min-h-0">
      <Button
        variant="link"
        className="justify-start text-accent"
        onClick={() =>
          navigate(`/${APP_PATHS.PROJECTS}/${currentProject?.id}/${APP_PATHS.PROJECT_TASKS}`)
        }
      >
        <ArrowLeft /> Back to Projects
      </Button>
      <div className="w-auto flex justify-between mb-6 ml-10">
        <h1 className="text-4xl font-bold ">{currentProject?.projectName}</h1>
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen((prev) => !prev)}>
          <DialogTrigger asChild>
            <Button variant="custom" size="custom" className='h-fit'>
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
      <div className="flex gap-6 flex-1 overflow-hidden min-h-0">
        <ProjectDetails />
        <Outlet />
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
