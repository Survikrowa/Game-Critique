import { ClipboardX } from "@tamagui/lucide-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { ScrollView, Separator, Tabs, XStack, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { GameStatusSearch } from "./game_status_search/game_status_search";
import { useGameStatusSearch } from "./game_status_search/use_game_status_search";
import { GameStatusTabContent } from "./game_status_tab_content/game_status_tab_content";
import { GameStatus } from "../../../__generated__/types";
import { ButtonWithIcon } from "../../../ui/forms/button_icon";
import { UserProfileScreenProps } from "../../router/screen_props";

function isGameStatus(input: string): input is GameStatus {
  return (Object.keys(GameStatus) as (keyof typeof GameStatus)[]).some(
    (k) => GameStatus[k] === input,
  );
}

type GamesStatusCategoriesTabsProps = {
  oauthId?: string;
};

export const GamesStatusCategoriesTabs = ({
  oauthId,
}: GamesStatusCategoriesTabsProps) => {
  const [selectedTab, setSelectedTab] = useState<GameStatus>(
    GameStatus.Completed,
  );

  const { search, handleSearch, debouncedSearch, resetSearch } =
    useGameStatusSearch();

  const navigation = useNavigation<UserProfileScreenProps["navigation"]>();
  const handleTabChange = (value: GameStatus) => {
    setSelectedTab(value);
    navigation.setParams({
      take: "5",
      skip: "0",
    });
  };

  return (
    <YStack backgroundColor="$color.container" alignItems="center">
      <XStack maxWidth={240} width="100%" alignItems="center">
        <GameStatusSearch onChange={handleSearch} value={search} />
        <ButtonWithIcon
          backgroundColor="transparent"
          marginTop={48}
          onPress={resetSearch}
          icon={<ClipboardX color="white" width={16} height={16} />}
        />
      </XStack>
      <Tabs
        defaultValue={selectedTab}
        orientation="horizontal"
        flexDirection="column"
        width="100%"
        maxWidth={400}
        height="min-content"
        overflow="hidden"
        alignItems="center"
        gap={16}
        onValueChange={(value) => isGameStatus(value) && handleTabChange(value)}
        padding={16}
        borderRadius={8}
      >
        <Tabs.List
          separator={<Separator vertical />}
          disablePassBorderRadius="bottom"
        >
          <Tabs.Tab
            value={GameStatus.Completed}
            backgroundColor={
              selectedTab === GameStatus.Completed ? "black" : "gray"
            }
          >
            <Text size="medium" weight="bold" color="white">
              Ukończone
            </Text>
          </Tabs.Tab>
          <Tabs.Tab
            value={GameStatus.InProgress}
            backgroundColor={
              selectedTab === GameStatus.InProgress ? "black" : "gray"
            }
          >
            <Text size="medium" weight="bold" color="white">
              W trakcie
            </Text>
          </Tabs.Tab>
          <Tabs.Tab
            value={GameStatus.Retired}
            backgroundColor={
              selectedTab === GameStatus.Retired ? "black" : "gray"
            }
          >
            <Text size="medium" weight="bold" color="white">
              Porzucone
            </Text>
          </Tabs.Tab>
        </Tabs.List>
        <ScrollView nestedScrollEnabled>
          <GameStatusTabContent
            oauthId={oauthId}
            selectedTab={selectedTab}
            enableActions={!oauthId}
            search={debouncedSearch}
          />
        </ScrollView>
      </Tabs>
    </YStack>
  );
};
