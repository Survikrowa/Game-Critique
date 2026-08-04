import { Link } from "expo-router";
import { Filter } from "lucide-react-native";

import { GamesStatusCategoriesFab } from "./games_status_categories_fab/games_status_categories_fab";
import { GamesStatusList } from "./games_status_list/games_status_list";
import { mapGamesStatusToItem } from "./games_status_list/map_games_status_to_item";
import { GamesStatusListSearch } from "./games_status_list_search/games_status_list_search";
import { useUserGamesStatus } from "./use_user_games_status/use_user_games_status";

import { ButtonWithIcon } from "@/ui/forms/button_icon";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

export const GamesScreen = () => {
  const gamesStatus = useUserGamesStatus();
  const items = mapGamesStatusToItem(
    gamesStatus.data?.userGamesStatus.userGamesStatus || [],
  );
  return (
    <VStack className="flex-1 h-full gap-4 px-4 pt-4">
      <HStack className="w-full gap-3 items-center">
        <GamesStatusListSearch />
        <Link asChild href="/games/filters/modal">
          <ButtonWithIcon
            action="secondary"
            variant="outline"
            className="w-[44px] h-[44px] bg-background-50 border-outline-0"
            onPress={() => {}}
            icon={<Filter size={20} color="#64748B" />}
          />
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
