import { useUserGamesStatusQueryQuery } from "./user_games_status_query.generated";
import { useGameStatusStore } from "../games_status_store/use_games_status_store";

export const useUserGamesStatus = ({
  oauthId,
  skip,
  take,
}: UseUserGamesStatusArgs) => {
  const gamesStatusStore = useGameStatusStore((state) => ({
    filters: state.filters,
    sort: state.sort,
  }));
  return useUserGamesStatusQueryQuery({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    variables: {
      oauthId: oauthId || "",
      status: gamesStatusStore.filters.status,
      skip,
      take,
      search: gamesStatusStore.filters.search,
    },
  });
};

type UseUserGamesStatusArgs = {
  oauthId?: string;
  take?: number;
  skip?: number;
};
