import { createFileRoute } from "@tanstack/react-router";

import { MainLayout } from "@/features/layouts/main_layout/main_layout.tsx";

export const Route = createFileRoute("/_layout")({
  component: MainLayout,
});
