import { Stack, useLocalSearchParams } from "expo-router";

import { BaseScreenLayout } from "@/modules/layouts/base_screen_layout/base_screen_layout";
import { GoBackHeader } from "@/modules/layouts/go_back_header/go_back_header";
import { useUserGameStatus } from "@/modules/screens/user_game_status/use_user_game_status/use_user_game_status";
import { UserGameStatusScreen } from "@/modules/screens/user_game_status/user_game_status_screen";

const GamesStatusInfo = () => {
  const { games_status_id, oauth_id } = useLocalSearchParams<{
    games_status_id: string;
    oauth_id: string;
  }>();
  const userGameStatusQuery = useUserGameStatus({
    gameStatusId: games_status_id,
    oauthId: oauth_id,
  });
  return (
    <BaseScreenLayout>
      <Stack.Screen
        options={{
          header: () => (
            <GoBackHeader
              text={userGameStatusQuery.data?.userGameStatus.game.name ?? ""}
            />
          ),
        }}
      />
      <UserGameStatusScreen
        redirect={{
          review: "games",
        }}
      />
    </BaseScreenLayout>
  );
};

export default GamesStatusInfo;
