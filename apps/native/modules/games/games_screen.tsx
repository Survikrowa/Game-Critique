import { GamesStatusCategoriesFab } from "./games_status_categories_tabs/games_status_categories_fab/games_status_categories_fab";
import { GamesStatusCategoriesTabs } from "./games_status_categories_tabs/games_status_categories_tabs";

export const GamesScreen = () => {
  return (
    <>
      <GamesStatusCategoriesTabs />
      <GamesStatusCategoriesFab />
    </>
  );
};
