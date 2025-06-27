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
import React from 'react';
import { NavLink } from 'react-router-dom';

export const AppSidebar = () => {
  const [currUrl, setCurrUrl] = React.useState(APP_PATHS.HOME);

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <img src="src/assets/task-flow-logo.svg" alt="company logo" width={50} height={50} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {NAVIGATION.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={currUrl === item.url}
                onClick={() => setCurrUrl(item.url)}
              >
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
          <NavLink to="/logout">
            <LogOut />
            <span>Logout</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};
