import { Stack } from "expo-router";

import { BaseScreenLayout } from "@/modules/layouts/base_screen_layout/base_screen_layout";
import { OwnGameStatusScreen } from "@/modules/screens/own_game_status/own_game_status_screen";

const GamesStatusInfo = () => {
  return (
    <BaseScreenLayout>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <OwnGameStatusScreen />
    </BaseScreenLayout>
  );
};

export default GamesStatusInfo;
