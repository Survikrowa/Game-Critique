import { useAuth0 } from "@auth0/auth0-react";
import { Home, Library, LogOutIcon, User } from "lucide-react";

import { SidebarDefaultMenuItem } from "@/features/layouts/app_sidebar/sidebar_default_menu_item.tsx";
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
    type: "default",
    label: "Dashboard",
    items: [
      {
        label: "Home",
        href: "/admin",
        icon: Home,
      },
    ],
  },
  {
    type: "default",
    label: "Users",
    items: [
      {
        label: "Search Users",
        href: "/admin/users",
        icon: User,
      },
      {
        label: "Search User Games",
        href: "/admin/user-games",
        icon: Library,
      },
    ],
  },
  {
    type: "default",
    label: "Games",
    items: [
      {
        label: "Search Games",
        href: "/admin/games",
        icon: Library,
      },
    ],
  },
  {
    type: "default",
    label: "Resources",
    items: [
      {
        label: "Platforms",
        href: "/admin/resources/platforms",
        icon: Library,
      },
    ],
  },
  {
    type: "default",
    label: "Migrations",
    items: [
      {
        label: "Migrations",
        href: "/admin/migrations",
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
                {group.items.map((item) => {
                  if (group.type === "default") {
                    return (
                      <SidebarDefaultMenuItem
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        href={item.href}
                      />
                    );
                  }
                  return null;
                })}
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
