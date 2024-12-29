import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { AppSidebar } from "@/features/layouts/app_sidebar/app_sidebar.tsx";

export const Route = createFileRoute("/_layout/_admin_layout")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated || context.auth.role !== "ADMIN") {
      throw redirect({
        to: "/",
      });
    }
  },
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
