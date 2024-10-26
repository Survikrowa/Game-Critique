import { Outlet, createRootRoute } from "@tanstack/react-router";
import { MainLayout } from "@/features/layouts/main_layout/main_layout.tsx";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <TanStackRouterDevtools />
    </>
  ),
});
