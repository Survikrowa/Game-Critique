import { GameScreen } from "../../../../../../modules/screens/game/game_screen";

const Game = () => (
  <GameScreen
    redirect={{ addToGameStatusUrl: "games/games_status_add_form" }}
  />
);

export default Game;
