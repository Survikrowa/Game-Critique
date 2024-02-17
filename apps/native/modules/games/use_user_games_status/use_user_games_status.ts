import { useUserGamesStatusQueryQuery } from "./user_games_status_query.generated";
import { GameStatus } from "../../../__generated__/types";

export const useUserGamesStatus = ({
  oauthId,
  status,
  skip,
  take,
}: UseUserGamesStatusArgs) => {
  return useUserGamesStatusQueryQuery({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    variables: {
      oauthId: oauthId || "",
      status,
      skip,
      take,
    },
  });
};

type UseUserGamesStatusArgs = {
  oauthId?: string;
  take?: number;
  skip?: number;
  status: GameStatus;
};
