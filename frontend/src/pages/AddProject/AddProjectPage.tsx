import { type IProjectForm, ProjectForm } from '@/components/ProjectForm/ProjectForm.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useProjects } from '@/contexts/ProjectsContext';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddProjectPage = () => {
  const navigate = useNavigate();
  const { createProject } = useProjects();

  return (
    <div className="w-full bg-white lg:px-30 px-10 py-10 rounded-3xl">
      <Button
        className="absolute top-12 right-18"
        variant="secondary"
        size="icon"
        onClick={() => navigate(-1)}
      >
        <X />
      </Button>
      <h1 className="text-2xl font-bold mb-8">Add Project</h1>
      <ProjectForm
        formAction={(values: IProjectForm) => {
          createProject?.mutate({
            ...values,
          });
        }}
      />
    </div>
  );
};

export default AddProjectPage;
