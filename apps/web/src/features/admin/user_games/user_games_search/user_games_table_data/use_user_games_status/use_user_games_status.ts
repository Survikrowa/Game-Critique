import { useUserGamesStatusQuery } from "./user_games_status.generated.ts";

type UseUserGamesStatusArgs = {
  oauthId: string;
};

export const useUserGamesStatus = ({ oauthId }: UseUserGamesStatusArgs) => {
  return useUserGamesStatusQuery(
    {
      oauthId,
    },
    { enabled: Boolean(oauthId) },
  );
};
