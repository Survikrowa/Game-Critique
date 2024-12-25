import { RefreshCwIcon } from "lucide-react";

import { useUserGamesStatus } from "@/features/admin/user_games/user_games_search/user_games_table_data/use_user_games_status/use_user_games_status.ts";
import { Button } from "@/packages/ui/inputs/button.tsx";

type RefreshUserGamesStatusListButtonProps = {
  oauthId: string;
};

export const RefreshUserGamesStatusListButton = ({
  oauthId,
}: RefreshUserGamesStatusListButtonProps) => {
  const { refetch, isLoading } = useUserGamesStatus({ oauthId });

  return (
    <Button variant="ghost" onClick={() => refetch()} disabled={isLoading}>
      <span className="sr-only">Refresh list</span>
      Refresh user's game status entries <RefreshCwIcon />
    </Button>
  );
};
