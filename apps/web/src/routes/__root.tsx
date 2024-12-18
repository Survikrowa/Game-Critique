import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import * as Types from "@/types.ts";

type AuthState = {
  isAuthenticated: boolean;
  role: Types.Role | null;
};

type RootRouteProps = {
  auth: AuthState;
};

export const Route = createRootRouteWithContext<RootRouteProps>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ),
});
