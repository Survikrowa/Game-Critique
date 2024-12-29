import { createFileRoute } from "@tanstack/react-router";

import { UserGames } from "@/features/admin/user_games/user_games.tsx";

export const Route = createFileRoute(
  "/_layout/_admin_layout/admin/user-games/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex w-full h-min">
      <UserGames />
    </div>
  );
}
