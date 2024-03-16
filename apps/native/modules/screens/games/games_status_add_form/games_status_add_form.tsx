import { GamesStatusForm } from "../../../games_status/games_status_form/games_status_form";
import { GameInfoQuery } from "../../game/use_get_game_info/game_info.generated";

type GamesStatusAddFormProps = {
  game: GameInfoQuery["game"];
};
export const GamesStatusAddForm = ({ game }: GamesStatusAddFormProps) => {
  return <GamesStatusForm game={game} />;
};
