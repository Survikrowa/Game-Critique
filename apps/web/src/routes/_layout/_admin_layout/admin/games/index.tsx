import { createFileRoute } from "@tanstack/react-router";

import { GamesList } from "@/features/admin/games/games_list.tsx";

export const Route = createFileRoute("/_layout/_admin_layout/admin/games/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <GamesList />;
}
