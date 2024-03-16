import { useUserGameStatusQuery } from "./user_game_status_query.generated";

type UseUserGameStatusArgs = {
  gameStatusId: string | undefined;
  oauthId?: string;
};

export const useUserGameStatus = ({
  gameStatusId,
  oauthId,
}: UseUserGameStatusArgs) => {
  return useUserGameStatusQuery({
    variables: {
      gameStatusId: Number(gameStatusId) || 0,
      oauthId: oauthId || "",
    },
  });
};
