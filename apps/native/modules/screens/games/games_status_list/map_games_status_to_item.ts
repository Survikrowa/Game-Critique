import { UserGamesStatusQueryQuery } from "../use_user_games_status/user_games_status_query.generated";

export const mapGamesStatusToItem = (
  gamesStatus: UserGamesStatusQueryQuery["userGamesStatus"]["userGamesStatus"],
) => {
  return gamesStatus.map((gameStatus) => ({
    id: gameStatus.id,
    gameId: gameStatus.game.id,
    title: gameStatus.game.name,
    platform: gameStatus.platform.name,
    platformId: gameStatus.platform.id,
    status: gameStatus.status,
    score: gameStatus.score || "0",
    cover: gameStatus.game.cover?.bigUrl || "",
    achievementsCompleted: gameStatus.achievementsCompleted || false,
  }));
};
