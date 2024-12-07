import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "@tanstack/react-router";
import { Home, Library, LogOutIcon, User } from "lucide-react";

import { Button } from "@/packages/ui/inputs/button.tsx";
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
  const { logout } = useAuth0();
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
        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button onClick={() => logout()}>
                    <LogOutIcon />
                    Logout
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
