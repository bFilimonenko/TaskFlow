import { APP_PATHS } from '@/app-paths.enum.ts';
import { ProjectsList } from '@/components/ProgectsList/ProjectsList.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Plus } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProjectsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="w-auto flex justify-between mb-6 ml-10">
        <h1 className="text-4xl font-bold ">Projects</h1>
        <Button variant="custom" size="custom" onClick={() => navigate(APP_PATHS.ADD_PROJECT)}>
          <Plus />
          Add Project
        </Button>
      </div>
      <div className="flex gap-6 overflow-hidden min-h-0">
        <ProjectsList />
        <Outlet />
      </div>
    </div>
  );
};

export default ProjectsPage;
