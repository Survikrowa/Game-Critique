import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { GameStatusActions } from "@/features/admin/user_games/user_games_search/user_games_table_data/game_status_actions/game_status_actions.tsx";

type UserGameStatus = {
  id: number;
  name: string;
  status: string;
  gameStatusId: number;
};

type UseGetUserGamesTableColumnsArgs = {
  oauthId: string;
};
export const useGetUserGamesTableColumns = ({
  oauthId,
}: UseGetUserGamesTableColumnsArgs): ColumnDef<UserGameStatus>[] => {
  return useMemo(() => {
    return [
      {
        accessorKey: "gameStatusId",
        header: "GameStatusId",
      },
      {
        accessorKey: "id",
        header: "GameId",
      },
      {
        accessorKey: "name",
        header: "Game Name",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const id = row.original.gameStatusId;
          return <GameStatusActions userOauthId={oauthId} gameStatusId={id} />;
        },
      },
    ];
  }, [oauthId]);
};
