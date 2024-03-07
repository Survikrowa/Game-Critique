import { ChevronRight } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Image, Separator, Spinner, Tabs, View, XStack, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { GamesStatusEmptyTab } from "./game_status_empty_tab/games_status_empty_tab";
import { GameStatusTabContentItemLeftContent } from "./game_status_tab_content_item_left_content/game_status_tab_content_item_left_content";
import { GameStatusTabContentPagination } from "./game_status_tab_content_pagination/game_status_tab_content_pagination";
import { GameStatus } from "../../../../__generated__/types";
import { truncateString } from "../../../strings/truncate_string";
import { useUserGamesStatus } from "../../use_user_games_status/use_user_games_status";

type GameStatusTabContentProps = {
  selectedTab: GameStatus;
  enableActions: boolean;
  oauthId?: string;
  search?: string;
};

type OnArrowClickArgs = {
  take: number;
  skip: number;
};

export const GameStatusTabContent = ({
  selectedTab,
  enableActions,
  oauthId,
  search,
}: GameStatusTabContentProps) => {
  const userGamesStatusQuery = useUserGamesStatus({
    oauthId,
    status: selectedTab,
    search,
  });
  const onArrowClick = async ({ take, skip }: OnArrowClickArgs) => {
    await userGamesStatusQuery.fetchMore({
      variables: {
        take,
        skip,
      },
    });
  };
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
  const { userGamesStatus, pagination } =
    userGamesStatusQuery.data.userGamesStatus;
  if (userGamesStatus.length === 0) {
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
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
    >
      {userGamesStatus.map((gameStatus, index) => {
        const targetUrl = `${oauthId ? "friends" : "games"}/games_status_info/${
          gameStatus.id
        }?oauth_id=${oauthId}`;

        return (
          <Swipeable
            enabled={enableActions}
            key={gameStatus.id}
            renderLeftActions={() => (
              <GameStatusTabContentItemLeftContent
                gameStatusId={gameStatus.id}
              />
            )}
          >
            <XStack
              alignItems="center"
              justifyContent="space-between"
              onPress={() => router.push(targetUrl)}
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
                  {gameStatus.score && (
                    <Text size="small" weight="bold" color="secondary">
                      Ocena: {gameStatus.score.replace("-", ",")}
                    </Text>
                  )}
                </YStack>
              </XStack>

              <ChevronRight color="white" />
            </XStack>
            {userGamesStatus.length > 1 &&
              userGamesStatus.length - 1 !== index && (
                <Separator marginVertical={8} backgroundColor="white" />
              )}
          </Swipeable>
        );
      })}
      {(pagination.hasMore || pagination.hasPrevious) && (
        <>
          <Separator marginVertical={8} backgroundColor="white" />
          <GameStatusTabContentPagination
            hasNextPage={pagination.hasMore}
            hasPreviousPage={pagination.hasPrevious}
            onNextPage={onArrowClick}
            onPreviousPage={onArrowClick}
          />
        </>
      )}
    </Tabs.Content>
  );
};
