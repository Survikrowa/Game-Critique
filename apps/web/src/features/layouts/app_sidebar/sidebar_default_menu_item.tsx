import { Link } from "@tanstack/react-router";

import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/packages/ui/navigation/sidebar.tsx";

type SidebarDefaultMenuItemProps = {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
export const SidebarDefaultMenuItem = ({
  label,
  icon: Icon,
  href,
}: SidebarDefaultMenuItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          to={href}
          activeOptions={{ exact: true }}
          activeProps={{ className: "bg-gray-800" }}
          className="block p-2 text-white hover:bg-gray-800"
        >
          <Icon />
          {label}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
