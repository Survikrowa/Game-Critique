import { useUserGamesStatusQueryQuery } from "./user_games_status_query.generated";

export const useUserGamesStatus = () => {
  return useUserGamesStatusQueryQuery();
};
