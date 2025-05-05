import { Cross, Filter, Search } from "@tamagui/lucide-icons";
import { Link, useNavigation } from "expo-router";
import { useState } from "react";
import { ScrollView, View, XStack, YStack } from "tamagui";

import { GamesStatusCategoriesFab } from "./games_status_categories_fab/games_status_categories_fab";
import { GamesStatusList } from "./games_status_list/games_status_list";
import { ButtonWithIcon } from "../../../ui/forms/button_icon";
import { Input } from "../../../ui/forms/input";

export const GamesScreen = () => {
  const [value, setValue] = useState("");
  const clearValue = () => {
    setValue("");
  };
  return (
    <YStack flex={1} height="100%" gap={16}>
      <XStack width="100%" gap={16}>
        <Input
          onChange={setValue}
          value={value}
          label="search"
          icon={
            value ? (
              <ButtonWithIcon onPress={clearValue} icon={<Cross />} />
            ) : (
              <Search />
            )
          }
        />
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
