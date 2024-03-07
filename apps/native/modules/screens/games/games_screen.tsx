import { ScrollView } from "tamagui";

import { GamesStatusCategoriesFab } from "./games_status_categories_fab/games_status_categories_fab";
import { GamesStatusCategoriesTabs } from "../../games/games_status_categories_tabs/games_status_categories_tabs";

export const GamesScreen = () => {
  return (
    <ScrollView maxHeight="99%" position="relative">
      <GamesStatusCategoriesTabs />
      <GamesStatusCategoriesFab />
    </ScrollView>
  );
};
