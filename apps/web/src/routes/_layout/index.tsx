import { createFileRoute, redirect } from "@tanstack/react-router";

import { AuthPage } from "@/features/auth/auth_page.tsx";

export const Route = createFileRoute("/_layout/")({
  loader: ({ context }) => {
    console.log(context.auth);
    if (context.auth.isAuthenticated && context.auth.role === "ADMIN") {
      throw redirect({
        to: "/admin",
      });
    }
  },
  component: () => <AuthPage />,
});
