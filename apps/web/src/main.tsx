import { useAuth0 } from "@auth0/auth0-react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";

import { routeTree } from "./routeTree.gen";

import { useVerifyUserQuery } from "@/features/auth/use_verify/verify_user.generated.ts";
import { Providers } from "@/features/layouts/providers/providers.tsx";

import "./globals.css";

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const MainApp = () => {
  const { isAuthenticated } = useAuth0();
  const { data } = useVerifyUserQuery(undefined, {
    enabled: isAuthenticated,
  });
  useEffect(() => {
    if (data?.verify) {
      router.invalidate();
    }
  }, [data?.verify]);
  return (
    <RouterProvider
      router={router}
      context={{
        auth: {
          isAuthenticated: data?.verify.authorized || false,
          role: data?.verify.role || null,
        },
      }}
    />
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <MainApp />
    </Providers>
  </StrictMode>,
);
