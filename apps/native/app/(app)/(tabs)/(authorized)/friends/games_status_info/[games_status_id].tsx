import { Stack } from "expo-router";

import { BaseScreenLayout } from "@/modules/layouts/base_screen_layout/base_screen_layout";
import { FriendGameStatusScreen } from "@/modules/screens/friend_game_status/friend_game_status_screen";

const GamesStatusInfo = () => {
  return (
    <BaseScreenLayout>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <FriendGameStatusScreen />
    </BaseScreenLayout>
  );
};

export default GamesStatusInfo;
