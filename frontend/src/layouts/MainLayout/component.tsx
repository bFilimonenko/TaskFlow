import { AppSidebar } from '@/components/Sidebar/appSidebar.tsx';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.tsx';
import { EmployeesProvider } from '@/contexts/EmployeesContext';
import { ProjectsProvider } from '@/contexts/ProjectsContext';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <ProjectsProvider>
        <EmployeesProvider>
          <main className="flex-1 h-screen overflow-hidden flex flex-col">
            <SidebarTrigger className="absolute  top-5 pl-2 w-10 border-l-0 rounded-l-none bg-sidebar hover:bg-blue-200" />
            <div className="flex-1 overflow-y-auto p-5 lg:mr-10">
              <Outlet />
            </div>
          </main>
        </EmployeesProvider>
      </ProjectsProvider>
    </SidebarProvider>
  );
};
