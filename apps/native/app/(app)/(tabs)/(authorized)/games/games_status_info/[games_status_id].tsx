import { BaseScreenLayout } from "../../../../../../modules/layouts/base_screen_layout/base_screen_layout";
import { UserGameStatusScreen } from "../../../../../../modules/screens/user_game_status/user_game_status_screen";

const GamesStatusInfo = () => {
  return (
    <BaseScreenLayout>
      <UserGameStatusScreen
        redirect={{
          review: "games",
        }}
      />
    </BaseScreenLayout>
  );
};

export default GamesStatusInfo;
