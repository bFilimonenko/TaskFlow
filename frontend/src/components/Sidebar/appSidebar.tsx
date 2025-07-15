import { APP_PATHS } from '@/app-paths.enum.ts';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NAVIGATION } from '@/layouts/MainLayout/constants.ts';
import { LogOut } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import mainLogo from '/task-flow-logo.svg';

export const AppSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <img src={mainLogo} alt="company logo" width={50} height={50} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {NAVIGATION.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={location.pathname.split('/')[1] === item.url}>
                <NavLink to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <NavLink to={APP_PATHS.LOGIN} onClick={() => localStorage.clear()}>
            <LogOut />
            <span>Logout</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};
