import { router } from "expo-router";
import { FloatingAction } from "react-native-floating-action";
import { XStack } from "tamagui";

import { ACTION_NAMES, FabOptions } from "./fab_options";

export const CollectionDetailsFab = () => {
  return (
    <XStack position="absolute" bottom={10} right={10}>
      <FloatingAction
        actions={FabOptions}
        onPressItem={(name) => {
          if (name === ACTION_NAMES.ADD_GAME) {
            router.push("search");
          }
        }}
      />
    </XStack>
  );
};
