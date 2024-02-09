import { useState } from "react";
import { Separator, Tabs } from "tamagui";
import { Text } from "ui/typography/text";

import { GameStatusCompletedTabContent } from "./game_status_completed_tab_content/game_status_completed_tab_content";
import { GamesStatusCategoriesFab } from "./games_status_categories_fab/games_status_categories_fab";

export const GamesStatusCategoriesTabs = () => {
  const [selectedTab, setSelectedTab] = useState<
    "completed" | "in-progress" | "retirted" | string
  >("completed");
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
      onValueChange={setSelectedTab}
    >
      <Tabs.List
        separator={<Separator vertical />}
        disablePassBorderRadius="bottom"
      >
        <Tabs.Tab
          value="completed"
          backgroundColor={selectedTab === "completed" ? "black" : "gray"}
        >
          <Text size="medium" weight="bold" color="white">
            Ukończone
          </Text>
        </Tabs.Tab>
        <Tabs.Tab
          value="in-progress"
          backgroundColor={selectedTab === "in-progress" ? "black" : "gray"}
        >
          <Text size="medium" weight="bold" color="white">
            W trakcie
          </Text>
        </Tabs.Tab>
        <Tabs.Tab
          value="retired"
          backgroundColor={selectedTab === "retirted" ? "black" : "gray"}
        >
          <Text size="medium" weight="bold" color="white">
            Porzucone
          </Text>
        </Tabs.Tab>
      </Tabs.List>
      <GameStatusCompletedTabContent />
    </Tabs>
  );
};
