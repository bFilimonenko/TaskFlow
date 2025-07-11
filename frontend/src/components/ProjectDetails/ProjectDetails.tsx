import { type IProjectForm, ProjectForm } from '@/components/ProjectForm/ProjectForm.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog.tsx';
import { useProjects } from '@/contexts/ProjectsContext';
import { PRIORITY } from '@/contexts/ProjectsContext/context.tsx';
import { Calendar, Edit } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';

const priorityColors: Record<PRIORITY, string> = {
  [PRIORITY.LOW]: 'text-green-500',
  [PRIORITY.MEDIUM]: 'text-yellow-500',
  [PRIORITY.HIGH]: 'text-red-500',
};

export const ProjectDetails = () => {
  const { currentProject, updateProject } = useProjects();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!currentProject) return null;

  return (
    <div className="relative grid gap-6 h-full bg-white w-73 rounded-3xl overflow-hidden py-6 px-4">
      <div>
        <span className="text-gray-400 text-sm">Project Number</span>
        <p>PN{String(currentProject?.id).padStart(5, '0')}</p>
      </div>
      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen((prev) => !prev)}>
        <DialogTrigger asChild>
          <Button className="absolute top-4 right-4 " variant="secondary" size="icon">
            <Edit />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <h1 className="text-2xl font-bold">Edit Project</h1>

          <ScrollArea className="h-[400px]">
            <div className="p-4">
              <ProjectForm
                editValues={currentProject}
                formAction={(values: IProjectForm) => {
                  updateProject?.mutate({
                    id: currentProject.id,
                    values,
                  });
                }}
                submitCallback={() => setDialogOpen(false)}
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <div>
        <h3 className="font-bold">Description</h3>
        <p>{currentProject?.description}</p>
      </div>
      <div>
        <span className="text-gray-400 text-sm">Priority</span>
        <p className={priorityColors[currentProject?.priority as PRIORITY]}>
          {currentProject?.priority}
        </p>
      </div>
      <div>
        <span className="text-gray-400 text-sm">Dead Line</span>
        <p>{new Date(`${currentProject?.deadLine}`).toLocaleDateString()}</p>
      </div>
      <div>
        <p className="flex gap-1.5 text-gray-500">
          <Calendar /> Created {new Date(`${currentProject?.starts}`).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
