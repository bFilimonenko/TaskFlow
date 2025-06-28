import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar.tsx';
import { NAVIGATION } from '@/layouts/MainLayout/constants.ts';
import { NavLink } from 'react-router-dom';

export const ProjectsList = () => {
  return (
    <div className="h-full bg-white w-1/4 rounded-3xl overflow-hidden p-3">
      <SidebarMenu>
        {NAVIGATION.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <NavLink to={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
};
