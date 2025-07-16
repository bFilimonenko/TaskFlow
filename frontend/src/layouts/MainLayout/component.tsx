import { AppSidebar } from '@/components/Sidebar/appSidebar.tsx';
import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import { EmployeesProvider } from '@/contexts/EmployeesContext';
import { ProjectsProvider } from '@/contexts/ProjectsContext';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <ProjectsProvider>
        <EmployeesProvider>
          <main className="w-full h-auto py-5 mr-10">
            <Outlet />
          </main>
        </EmployeesProvider>
      </ProjectsProvider>
    </SidebarProvider>
  );
};
