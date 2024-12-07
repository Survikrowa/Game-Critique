import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AppSidebar } from "@/features/layouts/app_sidebar/app_sidebar.tsx";

export const Route = createFileRoute("/_layout/_admin_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AppSidebar />
      <Outlet />
    </>
  );
}
