import { APP_PATHS } from '@/app-paths.enum.ts';
import { ProjectsLoading } from '@/components/ProgectsList/ProjectsLoading.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useProjects } from '@/contexts/ProjectsContext';
import type { Project } from '@/contexts/ProjectsContext/context.tsx';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProjectsList = () => {
  const { projects, isLoading, currentProject } = useProjects();
  const navigate = useNavigate();

  return (
    <div className="bg-white w-72 rounded-3xl overflow-hidden flex flex-col h-full min-h-0">
      <div className="flex flex-col gap-2 overflow-y-auto p-3 min-h-0">
        {isLoading ? (
          <ProjectsLoading />
        ) : (
          projects.map((project: Project) => (
            <div
              key={project.id}
              onClick={() => {
                navigate(`${project.id}/${APP_PATHS.PROJECT_TASKS}`);
              }}
              className={
                currentProject?.id === project.id
                  ? 'group flex flex-col gap-1 p-4 rounded-2xl bg-blue-50 border-r-2 border-r-blue-500'
                  : 'group flex flex-col gap-1 p-4 rounded-2xl hover:bg-blue-100'
              }
            >
              <div>
                <h3 className="font-bold">{project.projectName}</h3>
              </div>
              <Button
                variant="link"
                className={
                  currentProject?.id === project.id ? 'justify-start text-accent' : 'hidden'
                }
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`${project.id}/${APP_PATHS.PROJECT_DETAILS}`);
                }}
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
