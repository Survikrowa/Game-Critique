import { View } from "tamagui";

import { GamesScreen } from "../../../../../../modules/games/games_screen";

const GamesPage = () => {
  return (
    <View padding={16} height="100%" backgroundColor="$background">
      <GamesScreen />
    </View>
  );
};

export default GamesPage;
