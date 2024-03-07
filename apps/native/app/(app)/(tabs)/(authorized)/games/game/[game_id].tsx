import { GameScreen } from "../../../../../../modules/game/game_screen";
import { BaseScreenLayout } from "../../../../../../modules/layouts/base_screen_layout/base_screen_layout";

const Game = () => {
  return (
    <BaseScreenLayout>
      <GameScreen
        redirect={{ addToGameStatusUrl: "games/games_status_add_form" }}
      />
    </BaseScreenLayout>
  );
};

export default Game;
