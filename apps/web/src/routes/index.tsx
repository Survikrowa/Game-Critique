import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/features/auth/auth_page.tsx";

export const Route = createFileRoute("/")({
  component: () => <AuthPage />,
});
