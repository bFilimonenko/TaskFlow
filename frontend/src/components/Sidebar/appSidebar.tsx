import mainLogo from '/task-flow-logo.svg';
import { APP_PATHS } from '@/app-paths.enum.ts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { NAVIGATION } from '@/layouts/MainLayout/constants.ts';
import { LogOut } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

export const AppSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

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
      <SidebarFooter className="p-1">
        <SidebarMenuButton
          className=" h-9"
          asChild
          isActive={location.pathname.split('/')[1] === APP_PATHS.MY_PROFILE}
        >
          <NavLink to={APP_PATHS.MY_PROFILE}>
            <Avatar className="size-8">
              {/*<AvatarImage src="" />*/}
              <AvatarFallback className="text-xs bg-blue-200 text-black">
                {user?.firstName.charAt(0)}
                {user?.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span>My Profile</span>
          </NavLink>
        </SidebarMenuButton>
        <SidebarMenuButton asChild>
          <NavLink to={APP_PATHS.LOGIN} onClick={() => logout?.mutate()}>
            <LogOut />
            <span>Logout</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};
