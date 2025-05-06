import { Cross, Filter, Search } from "@tamagui/lucide-icons";
import { Link, useNavigation } from "expo-router";
import { useState } from "react";
import { ScrollView, View, XStack, YStack } from "tamagui";

import { GamesStatusCategoriesFab } from "./games_status_categories_fab/games_status_categories_fab";
import { GamesStatusList } from "./games_status_list/games_status_list";
import { GamesStatusListSearch } from "./games_status_list_search/games_status_list_search";

export const GamesScreen = () => {
  return (
    <YStack flex={1} height="100%" gap={16}>
      <XStack width="100%" gap={16}>
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
            }}
          >
            <Filter height="100%" width="100%" />
          </View>
        </Link>
      </XStack>
      <GamesStatusList />
      <GamesStatusCategoriesFab />
    </YStack>
  );
};
