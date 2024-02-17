import { router } from "expo-router";
import { FloatingAction } from "react-native-floating-action";
import { XStack } from "tamagui";

import {
  GAMES_STATUS_CATEGORIES_FAB_OPTIONS,
  ACTION_NAMES,
} from "./games_status_categories_fab_options";

export const GamesStatusCategoriesFab = () => {
  return (
    <XStack position="absolute" bottom={10} right={10}>
      <FloatingAction
        actions={GAMES_STATUS_CATEGORIES_FAB_OPTIONS}
        onPressItem={(name) => {
          if (name === ACTION_NAMES.ADD_GAME) {
            router.push("search");
          }
        }}
      />
    </XStack>
  );
};
