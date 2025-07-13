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

const ProjectPage = () => {
  const navigate = useNavigate();
  const { currentProject, createTask } = useProjects();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!currentProject) return null;
  return (
    <div>
      <Button
        variant="link"
        className="justify-start text-accent"
        onClick={() =>
          navigate(`/${APP_PATHS.PROJECTS}/${currentProject?.id}/${APP_PATHS.PROJECT_TASKS}`)
        }
      >
        <ArrowLeft /> Back to Projects
      </Button>
      <div className="w-full flex justify-between mb-6">
        <h1 className="text-4xl font-bold ">{currentProject?.projectName}</h1>
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
      <div className="flex gap-6">
        <ProjectDetails />
        <Outlet />
      </div>
    </div>
  );
};

export default ProjectPage;
