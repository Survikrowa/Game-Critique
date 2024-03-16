import { BaseScreenLayout } from "../../../../../modules/layouts/base_screen_layout/base_screen_layout";
import { GameScreen } from "../../../../../modules/screens/game/game_screen";

const Game = () => {
  return (
    <BaseScreenLayout>
      <GameScreen
        redirect={{ addToGameStatusUrl: "search/games_status_add_form" }}
      />
    </BaseScreenLayout>
  );
};

export default Game;
