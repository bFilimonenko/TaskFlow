import { AddTask } from '@/components/AddTask/AddTask.tsx';
import { ProjectDetails } from '@/components/ProjectDetails/ProjectDetails';
import { Button } from '@/components/ui/button.tsx';
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx';
import { useProjects } from '@/contexts/ProjectsContext';
import TasksPage from '@/pages/Tasks/TasksPage.tsx';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectPage = () => {
  const navigate = useNavigate();
  const { currentProject } = useProjects();
  return (
    <div>
      <Button variant="link" className="justify-start text-accent" onClick={() => navigate(-1)}>
        <ArrowLeft /> Back to Projects
      </Button>
      <div className="w-full flex justify-between mb-6">
        <h1 className="text-4xl font-bold ">{currentProject?.projectName}</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="custom" size="custom">
              <Plus />
              Add Task
            </Button>
          </DialogTrigger>
          <AddTask />
        </Dialog>
      </div>
      <div className="flex gap-6">
        <ProjectDetails />
        <TasksPage />
      </div>
    </div>
  );
};

export default ProjectPage;
