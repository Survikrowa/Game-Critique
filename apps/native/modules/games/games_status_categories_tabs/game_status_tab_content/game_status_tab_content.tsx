import { ChevronRight } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Fragment } from "react";
import {
  Image,
  ScrollView,
  Separator,
  Spinner,
  Tabs,
  View,
  XStack,
  YStack,
} from "tamagui";
import { Text } from "ui/typography/text";

import { GamesStatusEmptyTab } from "./game_status_empty_tab/games_status_empty_tab";
import { GameStatus } from "../../../../__generated__/types";
import { truncateString } from "../../../strings/truncate_string";
import { useUserGamesStatus } from "../../use_user_games_status/use_user_games_status";

type GameStatusTabContentProps = {
  selectedTab: GameStatus;
};

export const GameStatusTabContent = ({
  selectedTab,
}: GameStatusTabContentProps) => {
  const userGamesStatusQuery = useUserGamesStatus();
  if (userGamesStatusQuery.loading || !userGamesStatusQuery.data) {
    return (
      <Tabs.Content
        value={selectedTab}
        borderRadius={8}
        width="100%"
        key="tab3"
        padding="$2"
        alignItems="center"
        justifyContent="center"
      >
        <View
          height="100%"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="large" />
        </View>
      </Tabs.Content>
    );
  }
  const filteredGames = userGamesStatusQuery.data.userGamesStatus.filter(
    (gameStatus) => gameStatus.status === selectedTab,
  );
  if (filteredGames.length === 0) {
    return (
      <Tabs.Content
        value={selectedTab}
        borderRadius={8}
        width="100%"
        key="tab3"
        padding="$2"
        alignItems="center"
        justifyContent="center"
      >
        <GamesStatusEmptyTab />
      </Tabs.Content>
    );
  }
  return (
    <Tabs.Content
      value={selectedTab}
      borderRadius={8}
      width="100%"
      elevate
      bordered
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
    >
      <ScrollView>
        {filteredGames.map((gameStatus, index) => {
          return (
            <Fragment key={gameStatus.id}>
              <XStack
                alignItems="center"
                justifyContent="space-between"
                onPress={() =>
                  router.push(`/games/games_status_info/${gameStatus.id}`)
                }
              >
                <XStack alignItems="center" width="80%" padding={8}>
                  <View maxHeight={50} maxWidth={50} height="100%">
                    <Image
                      resizeMode="contain"
                      source={{
                        uri: gameStatus.game.cover?.bigUrl,
                      }}
                      style={{ width: 50, height: 50 }}
                    />
                  </View>
                  <YStack>
                    <Text size="medium" weight="bold" color="primary">
                      {truncateString(gameStatus.game.name, 15)}
                    </Text>
                    <Text size="small" weight="normal" color="secondary">
                      {gameStatus.platform?.name}
                    </Text>
                  </YStack>
                </XStack>

                <ChevronRight />
              </XStack>
              {filteredGames.length - 1 !== index && (
                <Separator marginVertical={8} />
              )}
            </Fragment>
          );
        })}
      </ScrollView>
    </Tabs.Content>
  );
};
