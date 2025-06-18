import { MoreHorizontal } from "lucide-react";

import { GamesListRowActionUpdateGame } from "@/features/admin/games/games_list_table/games_list_row_actions/games_list_row_action_update_game/games_list_row_action_update_game.tsx";
import { Button } from "@/packages/ui/inputs/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/packages/ui/navigation/dropdown.tsx";

type GamesListRowActionsProps = {
  hltbId: number;
};

export const GamesListRowActions = ({ hltbId }: GamesListRowActionsProps) => {
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
        <GamesListRowActionUpdateGame hltbId={hltbId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
