import { router } from "expo-router";
import { FloatingAction } from "react-native-floating-action";

import { FabOptions } from "./fab_options";

export const CollectionDetailsFab = () => {
  return (
    <FloatingAction
      actions={FabOptions}
      onPressItem={(name) => {
        if (name === "add_game") {
          router.push("search");
        }
      }}
    />
  );
};
