import { ProjectsList } from '@/components/ProgectsList/ProjectsList.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Plus } from 'lucide-react';

const ProjectsPage = () => {
  return (
    <div>
      <div className="w-full flex justify-between mb-7">
        <h1 className="text-4xl font-bold ">Projects</h1>
        <Button variant="custom" size="custom">
          <Plus />
          Add Project
        </Button>
      </div>
      <ProjectsList />
    </div>
  );
};

export default ProjectsPage;
