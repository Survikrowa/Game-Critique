import { MoreHorizontal } from "lucide-react";

import { DeleteGameStatusAction } from "@/features/admin/user_games/user_games_search/user_games_table_data/game_status_actions/delete_game_status_action/delete_game_status_action.tsx";
import { Button } from "@/packages/ui/inputs/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/packages/ui/navigation/dropdown.tsx";

type GameStatusActionsProps = {
  userOauthId: string;
  gameStatusId: number;
};

export const GameStatusActions = ({
  userOauthId,
  gameStatusId,
}: GameStatusActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DeleteGameStatusAction
          gameStatusId={gameStatusId}
          userOauthId={userOauthId}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
