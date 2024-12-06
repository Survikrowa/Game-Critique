import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated || context.auth.role !== "ADMIN") {
      throw redirect({
        to: "/",
      });
    }
  },
  component: () => <div>Hello /admin/!</div>,
});
