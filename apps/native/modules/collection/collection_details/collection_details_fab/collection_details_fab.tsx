import { router } from "expo-router";
import { FloatingAction } from "react-native-floating-action";

import { ACTION_NAMES, FabOptions } from "./fab_options";

export const CollectionDetailsFab = () => {
  return (
    <FloatingAction
      actions={FabOptions}
      onPressItem={(name) => {
        if (name === ACTION_NAMES.ADD_GAME) {
          router.push("search");
        }
      }}
    />
  );
};
