import { useState } from "react";
import { FlatList } from "react-native";
import { Image, XStack, YStack } from "tamagui";

import { GamesStatusListItem } from "./games_status_list_item/games_status_list_item";
import { ClearButton } from "../../../../ui/forms/clear_button";
import { Sheet } from "../../../../ui/panels/sheet/sheet";
import { Text } from "../../../../ui/typography/text";
import { truncateString } from "../../../strings/truncate_string";

const MOCKED_GAMES = [
  {
    title: "GAME",
    platform: "GAME",
    score: "5.0",
    cover: "https://howlongtobeat.com/games/62941_Hades.jpg?width=760",
  },
  {
    title: "GAME",
    platform: "GAME",
    score: "5.0",
    cover: "https://howlongtobeat.com/games/62941_Hades.jpg?width=760",
  },
  {
    title: "GAME",
    platform: "GAME",
    score: "5.0",
    cover: "https://howlongtobeat.com/games/62941_Hades.jpg?width=760",
  },
  {
    title: "GAME",
    platform: "GAME",
    score: "5.0",
    cover: "https://howlongtobeat.com/games/62941_Hades.jpg?width=760",
  },
];

export const GamesStatusList = () => {
  return (
    <FlatList
      data={MOCKED_GAMES}
      numColumns={3}
      contentContainerStyle={{
        display: "flex",
        gap: 12,
      }}
      columnWrapperStyle={{
        flex: 1,
        display: "flex",
        gap: 20,
        justifyContent: "space-evenly",
      }}
      renderItem={({ item }) => {
        return (
          <YStack>
            <GamesStatusListItem item={item} />
          </YStack>
        );
      }}
    />
  );
};
