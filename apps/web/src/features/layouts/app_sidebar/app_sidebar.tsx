import { Link } from "@tanstack/react-router";
import { Home, Library, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/packages/ui/navigation/sidebar.tsx";

const sidebarItems = [
  {
    label: "Dashboard",
    items: [
      {
        label: "Home",
        href: "/",
        icon: Home,
      },
    ],
  },
  {
    label: "Users",
    items: [
      {
        label: "Search Users",
        href: "/users",
        icon: User,
      },
      {
        label: "Search User Games",
        href: "/user-games",
        icon: Library,
      },
    ],
  },
];

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        {sidebarItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className="block p-2 text-white hover:bg-gray-800"
                      >
                        <item.icon />
                        {item.label}
                      </Link>
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
};
