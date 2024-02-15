import { router } from "expo-router";
import { FloatingAction } from "react-native-floating-action";
import { XStack } from "tamagui";

import { ACTION_NAMES, FabOptions } from "./friends_list_fab_options";

export const FriendsListFab = () => {
  return (
    <XStack position="absolute" bottom={10} right={10}>
      <FloatingAction
        actions={FabOptions}
        onPressItem={(name) => {
          if (name === ACTION_NAMES.FRIENDS_REQUESTS) {
            router.push("/friends/friends_requests/");
          }
          if (name === ACTION_NAMES.FRIENDS_SEARCH) {
            router.push("/friends/friends_search/");
          }
        }}
      />
    </XStack>
  );
};
