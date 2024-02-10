import { useUserGameStatusQuery } from "./user_game_status_query.generated";

type UseUserGameStatusArgs = {
  gameStatusId: string | undefined;
};

export const useUserGameStatus = ({ gameStatusId }: UseUserGameStatusArgs) => {
  return useUserGameStatusQuery({
    variables: {
      gameStatusId: Number(gameStatusId) || 0,
    },
  });
};
