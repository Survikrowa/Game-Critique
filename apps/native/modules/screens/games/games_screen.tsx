import { Filter } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { View } from "tamagui";

import { GamesStatusCategoriesFab } from "./games_status_categories_fab/games_status_categories_fab";
import { GamesStatusList } from "./games_status_list/games_status_list";
import { mapGamesStatusToItem } from "./games_status_list/map_games_status_to_item";
import { GamesStatusListSearch } from "./games_status_list_search/games_status_list_search";
import { useUserGamesStatus } from "./use_user_games_status/use_user_games_status";

import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

export const GamesScreen = () => {
  const gamesStatus = useUserGamesStatus();
  const items = mapGamesStatusToItem(
    gamesStatus.data?.userGamesStatus.userGamesStatus || [],
  );
  return (
    <VStack className="flex-1 h-full gap-4">
      <HStack className="w-full">
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
      </HStack>
      <GamesStatusList
        items={items}
        loading={gamesStatus.loading}
        onEndReached={gamesStatus.fetchMoreGamesStatus}
        onRefresh={gamesStatus.onRefresh}
      />
      <GamesStatusCategoriesFab />
    </VStack>
  );
};
