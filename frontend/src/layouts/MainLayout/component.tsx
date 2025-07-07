import { AppSidebar } from '@/components/Sidebar/appSidebar.tsx';
import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import { ProjectsProvider } from '@/contexts/ProjectsContext';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <ProjectsProvider>
        <main className="w-full h-auto py-5">
          {/*<SidebarTrigger />*/}
          <Outlet />
        </main>
      </ProjectsProvider>
    </SidebarProvider>
  );
};
