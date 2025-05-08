import { View } from "tamagui";

import { GamesScreen } from "../../../../../modules/screens/games/games_screen";

const GamesPage = () => {
  return (
    <View
      backgroundColor="$color.background"
      position="relative"
      zIndex={1}
      height="100%"
    >
      <GamesScreen />
    </View>
  );
};

export default GamesPage;
