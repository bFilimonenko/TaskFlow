import { AppSidebar } from '@/components/Sidebar/appSidebar.tsx';
import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <SidebarProvider className="p-6">
      <AppSidebar />
      <main className="w-full h-auto">
        {/*<SidebarTrigger />*/}
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
