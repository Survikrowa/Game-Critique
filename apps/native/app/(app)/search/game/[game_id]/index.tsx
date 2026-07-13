import { GameScreen } from "../../../../../modules/screens/game/game_screen";

const Game = () => (
  <GameScreen
    redirect={{ addToGameStatusUrl: "search/games_status_add_form" }}
  />
);

export default Game;
