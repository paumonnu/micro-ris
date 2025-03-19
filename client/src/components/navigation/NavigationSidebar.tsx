import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

import {
  faChartLine,
  faUsers,
  faXRay,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router';

const menuGroups = [
  {
    name: 'Analytics',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: faChartLine,
      },
    ],
  },
  {
    name: 'Studies',
    items: [
      {
        title: 'Radiology',
        url: '/radiology',
        icon: faXRay,
      },
    ],
  },
  {
    name: 'Management',
    items: [
      {
        title: 'Users',
        url: '/users',
        icon: faUsers,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar">
      <SidebarContent>
        {menuGroups.map((group) => (
          <SidebarGroup key={group.name}>
            <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700 ${
                            isActive ? 'bg-zinc-200' : ''
                          }`
                        }
                      >
                        <FontAwesomeIcon
                          className="w-4! h-4!"
                          icon={item.icon}
                        />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
