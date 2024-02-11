import { useLocalSearchParams } from "expo-router";
import { Spinner, YStack, ScrollView } from "tamagui";

import { GameImage } from "./game_image/game_image";
import { GameInfo } from "./game_info/game_info";
import { GameTabs } from "./game_tabs/game_tabs";
import { useGetGameInfo } from "./use_get_game_info/use_get_game_info";

export const GameScreen = () => {
  const { game_id } = useLocalSearchParams<{ game_id: string }>();
  const gameQuery = useGetGameInfo(game_id);
  if (gameQuery.loading || !gameQuery.data || !game_id) {
    return <Spinner size="large" />;
  }
  const game = gameQuery.data.game;
  return (
    <ScrollView padding={16} height="100%">
      <YStack alignItems="center" gap={16} height="100%">
        <YStack alignItems="center" gap={64}>
          <GameImage uri={game.cover?.mediumUrl} />
          <GameTabs game={{ name: game.name, hltbId: game_id }} />
        </YStack>

        <GameInfo
          game={{
            name: game.name,
            releaseYear: game.releases?.date,
            platforms: game.platforms.map((platform) => platform.name),
          }}
        />
      </YStack>
    </ScrollView>
  );
};
