import { View } from "tamagui";

import { UserGameStatusScreen } from "../../../../../../../modules/games/user_game_status/user_game_status_screen";

const GamesStatusInfo = () => {
  return (
    <View padding={16}>
      <UserGameStatusScreen />
    </View>
  );
};

export default GamesStatusInfo;
