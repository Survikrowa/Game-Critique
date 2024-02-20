import { GameInfoQuery } from "../../../game/use_get_game_info/game_info.generated";
import { GamesStatusForm } from "../../../games_status/games_status_form/games_status_form";

type GamesStatusAddFormProps = {
  game: GameInfoQuery["game"];
};
export const GamesStatusAddForm = ({ game }: GamesStatusAddFormProps) => {
  return <GamesStatusForm game={game} />;
};
