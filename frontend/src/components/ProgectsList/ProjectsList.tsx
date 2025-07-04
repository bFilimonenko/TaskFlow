import { ProjectsLoading } from '@/components/ProgectsList/ProjectsLoading.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useProjects } from '@/contexts/ProjectsContext';
import type { Project } from '@/contexts/ProjectsContext/context.tsx';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export const ProjectsList = () => {
  const { projects, isLoading } = useProjects();
  const [activeProject, setActiveProject] = useState(0);

  return (
    <div className="h-full bg-white w-1/4 rounded-3xl overflow-hidden p-3">
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <ProjectsLoading />
        ) : (
          projects.map((project: Project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project.id)}
              className={
                activeProject === project.id
                  ? 'group flex flex-col gap-1 p-4 rounded-2xl bg-blue-50 border-r-2 border-r-blue-500'
                  : 'group flex flex-col gap-1 p-4 rounded-2xl hover:bg-blue-100'
              }
            >
              <div>
                <h3 className="font-bold">{project.projectName}</h3>
              </div>
              <Button
                variant="link"
                className={activeProject === project.id ? 'justify-start text-accent' : 'hidden'}
              >
                View details <ChevronRight />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
