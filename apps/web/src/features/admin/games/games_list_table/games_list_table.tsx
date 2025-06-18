import { useState } from "react";

import { gamesListTableColumns } from "@/features/admin/games/games_list_table/games_list_table_columns.tsx";
import { useGames } from "@/features/admin/games/games_list_table/use_games/use_games.ts";
import { DataTable } from "@/packages/ui/data_display/data_table/data_table.tsx";
import { Skeleton } from "@/packages/ui/feedback/skeleton.tsx";

type GamesListTableProps = {
  search?: string;
};

export const GamesListTable = ({ search }: GamesListTableProps) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const gamesQuery = useGames({
    search: search || "",
    take: pagination.pageSize,
    skip: pagination.pageSize * pagination.pageIndex,
  });

  if (gamesQuery.isLoading || gamesQuery.isError || !gamesQuery.data) {
    return <Skeleton />;
  }
  return (
    <DataTable
      columns={gamesListTableColumns}
      data={gamesQuery.data.games.items}
      withPagination
      pagination={pagination}
      manualPagination
      rowCount={gamesQuery.data.games.pagination.total}
      onPaginationChange={(updater) => setPagination(updater)}
    />
  );
};
