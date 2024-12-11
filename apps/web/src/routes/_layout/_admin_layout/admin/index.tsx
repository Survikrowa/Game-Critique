import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/_admin_layout/admin/")({
  component: () => <div>Hello /admin/!</div>,
});
