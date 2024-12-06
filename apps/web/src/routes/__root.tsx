import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { MainLayout } from "@/features/layouts/main_layout/main_layout.tsx";
import * as Types from "@/types.ts";

type AuthState = {
  isAuthenticated: boolean;
  role: Types.Roles | null;
};

type RootRouteProps = {
  auth: AuthState;
};

export const Route = createRootRouteWithContext<RootRouteProps>()({
  component: () => (
    <>
      <MainLayout>
        <Outlet />
        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </MainLayout>
    </>
  ),
});
