import { useDebounce } from "use-debounce";

import { useGetUserGamesTableColumns } from "@/features/admin/user_games/user_games_search/user_games_table_data/use_get_user_games_table_columns.tsx";
import { useUserGamesStatus } from "@/features/admin/user_games/user_games_search/user_games_table_data/use_user_games_status/use_user_games_status.ts";
import { DataTable } from "@/packages/ui/data_display/data_table/data_table.tsx";

type UserGamesTableDataProps = {
  oauthId: string;
  groupDuplicates: boolean;
};

export const UserGamesTableData = ({
  oauthId,
  groupDuplicates,
}: UserGamesTableDataProps) => {
  const [debouncedOauthId] = useDebounce(oauthId, 500);
  const userGamesStatusQuery = useUserGamesStatus({
    oauthId: debouncedOauthId.trim(),
  });

  const columns = useGetUserGamesTableColumns({
    oauthId,
  });
  const userGamesStatus =
    userGamesStatusQuery.data?.getAllUserGamesStatusByOauthId.map(
      (gameStatus) => ({
        id: gameStatus.game.id,
        name: gameStatus.game.name,
        status: gameStatus.status,
        gameStatusId: gameStatus.id,
      }),
    ) || [];

  const data = groupDuplicates
    ? groupGameStatusDuplicates(userGamesStatus)
    : userGamesStatus;
  return <DataTable columns={columns} data={data} withPagination />;
};

type UserGameStatus = {
  id: number;
  name: string;
  status: string;
  gameStatusId: number;
};

const groupGameStatusDuplicates = (data: UserGameStatus[]) => {
  const groupedData = data.reduce<Record<string, UserGameStatus[]>>(
    (acc, curr) => {
      if (!acc[curr.name]) {
        acc[curr.name] = [];
      }
      acc[curr.name].push(curr);
      return acc;
    },
    {},
  );
  return Object.values(groupedData)
    .filter((gameStatus) => gameStatus.length > 1)
    .flat();
};
