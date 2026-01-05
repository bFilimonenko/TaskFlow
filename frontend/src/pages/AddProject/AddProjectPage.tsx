import { type IProjectForm, ProjectForm } from '@/components/ProjectForm/ProjectForm.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useProjects } from '@/contexts/ProjectsContext';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddProjectPage = () => {
  const navigate = useNavigate();
  const { createProject } = useProjects();

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="relative mb-4">
        <h1 className="text-2xl font-bold ml-8">Add Project</h1>
        <Button
          className="absolute -top-1 right-0 bg-white"
          variant="secondary"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <X />
        </Button>
      </div>
      <div className="overflow-y-auto min-h-0 bg-white lg:px-20 md:px-10 p-5 py-10 rounded-3xl">
        <ProjectForm
          formAction={(values: IProjectForm) => {
            createProject?.mutate({
              ...values,
            });
          }}
        />
      </div>
    </div>
  );
};

export default AddProjectPage;
