import { Filter } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { View, XStack, YStack } from "tamagui";

import { GamesStatusCategoriesFab } from "./games_status_categories_fab/games_status_categories_fab";
import { GamesStatusList } from "./games_status_list/games_status_list";
import { mapGamesStatusToItem } from "./games_status_list/map_games_status_to_item";
import { GamesStatusListSearch } from "./games_status_list_search/games_status_list_search";
import { useUserGamesStatus } from "./use_user_games_status/use_user_games_status";

export const GamesScreen = () => {
  const gamesStatus = useUserGamesStatus();
  const items = mapGamesStatusToItem(
    gamesStatus.data?.userGamesStatus.userGamesStatus || [],
  );
  return (
    <YStack flex={1} height="100%" gap={16}>
      <XStack width="100%">
        <GamesStatusListSearch />
        <Link asChild href="/games/filters/modal">
          <View
            style={{
              maxWidth: 42,
              borderRadius: 8,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flex: 1,
              backgroundColor: "white",
              borderColor: "black",
              marginLeft: 16,
            }}
          >
            <Filter height="100%" width="100%" />
          </View>
        </Link>
      </XStack>
      <GamesStatusList
        items={items}
        loading={gamesStatus.loading}
        onEndReached={gamesStatus.fetchMoreGamesStatus}
        onRefresh={gamesStatus.onRefresh}
      />
      <GamesStatusCategoriesFab />
    </YStack>
  );
};
