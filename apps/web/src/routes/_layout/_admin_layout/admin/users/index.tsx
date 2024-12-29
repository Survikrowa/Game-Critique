import { createFileRoute } from "@tanstack/react-router";

import { UsersPage } from "@/features/admin/users/users_page.tsx";

export const Route = createFileRoute("/_layout/_admin_layout/admin/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UsersPage />;
}
