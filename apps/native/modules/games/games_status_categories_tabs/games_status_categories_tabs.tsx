import { useEffect, useState } from "react";
import { Separator, Tabs } from "tamagui";
import { Text } from "ui/typography/text";

import { GameStatusTabContent } from "./game_status_tab_content/game_status_tab_content";
import { GameStatus } from "../../../__generated__/types";

function isGameStatus(input: string): input is GameStatus {
  return (Object.keys(GameStatus) as (keyof typeof GameStatus)[]).some(
    (k) => GameStatus[k] === input,
  );
}

export const GamesStatusCategoriesTabs = () => {
  const [selectedTab, setSelectedTab] = useState<GameStatus>(
    GameStatus.Completed,
  );

  return (
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
      onValueChange={(value) => isGameStatus(value) && setSelectedTab(value)}
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
      <GameStatusTabContent selectedTab={GameStatus.Completed} />
      <GameStatusTabContent selectedTab={GameStatus.InProgress} />
      <GameStatusTabContent selectedTab={GameStatus.Retired} />
    </Tabs>
  );
};
