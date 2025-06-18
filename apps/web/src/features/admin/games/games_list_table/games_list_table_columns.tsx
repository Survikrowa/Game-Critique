import { ColumnDef } from "@tanstack/react-table";

import { GamesListRowActions } from "@/features/admin/games/games_list_table/games_list_row_actions/games_list_row_actions.tsx";

type Game = {
  id: number;
  name: string;
  slug: string;
  hltbId: number;
};

export const gamesListTableColumns: ColumnDef<Game>[] = [
  {
    accessorKey: "name",
    header: "Game Name",
  },
  {
    accessorKey: "slug",
    header: "Game Slug",
  },
  {
    accessorKey: "id",
    header: "Game ID",
  },
  {
    accessorKey: "hltbId",
    header: "HowLongToBeat ID",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const gameId = row.original.hltbId;
      return <GamesListRowActions hltbId={gameId} />;
    },
  },
];
