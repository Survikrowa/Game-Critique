import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Spinner, YStack, ScrollView } from "tamagui";

import { GameCompletionTime } from "./game_completion_time/game_completion_time";
import { GameImage } from "./game_image/game_image";
import { GameInfo } from "./game_info/game_info";
import { GamePreparingInfo } from "./game_preparing_info/game_preparing_info";
import { GameTabs } from "./game_tabs/game_tabs";
import { useGetGameInfo } from "./use_get_game_info/use_get_game_info";
import { useSetHeaderTitle } from "../../router/use_set_header_title";

type GameScreenProps = {
  redirect: {
    addToGameStatusUrl: string;
  };
};

export const GameScreen = ({ redirect }: GameScreenProps) => {
  const { game_id } = useLocalSearchParams<{ game_id: string }>();
  const gameQuery = useGetGameInfo(game_id);

  useSetHeaderTitle(gameQuery.data?.game.name || "");

  const onRefreshClick = () => {
    gameQuery.refetch();
  };
  if (gameQuery.error) {
    return <GamePreparingInfo onRefreshClick={onRefreshClick} />;
  }
  if (gameQuery.loading || !gameQuery.data || !game_id) {
    return <Spinner size="large" />;
  }
  const game = gameQuery.data.game;
  return (
    <ScrollView height="100%">
      <YStack alignItems="center" gap={16} height="100%">
        <YStack alignItems="center" gap={64}>
          <GameImage uri={game.cover?.mediumUrl} />
          <GameTabs
            game={{ name: game.name, hltbId: game_id }}
            redirect={redirect}
          />
        </YStack>

        <GameInfo
          game={{
            name: game.name,
            releaseYear: game.releases?.date,
            platforms: game.platforms.map((platform) => platform.name),
          }}
        />
        <GameCompletionTime
          main={game.completionTime?.main}
          completionist={game.completionTime?.completionist}
          mainExtra={game.completionTime?.mainExtra}
        />
      </YStack>
    </ScrollView>
  );
};
