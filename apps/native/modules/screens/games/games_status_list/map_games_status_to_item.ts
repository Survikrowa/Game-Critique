import { UserGamesStatusQueryQuery } from "../use_user_games_status/user_games_status_query.generated";

export const mapGamesStatusToItem = (
  gamesStatus: UserGamesStatusQueryQuery["userGamesStatus"]["userGamesStatus"],
) => {
  return gamesStatus.map((gameStatus) => ({
    id: gameStatus.id,
    title: gameStatus.game.name,
    platform: gameStatus.platform.name,
    score: gameStatus.score || "0",
    cover: gameStatus.game.cover?.bigUrl || "",
  }));
};
