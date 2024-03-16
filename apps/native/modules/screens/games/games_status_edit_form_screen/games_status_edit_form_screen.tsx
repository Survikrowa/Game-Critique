import { useLocalSearchParams } from "expo-router";
import { View } from "tamagui";
import { Text } from "ui/typography/text";

import { GamesStatusEditForm } from "./games_status_edit_form/games_status_edit_form";
import { useUserGameStatus } from "../../user_game_status/use_user_game_status/use_user_game_status";
export const GamesStatusEditFormScreen = () => {
  const { game_status_id } = useLocalSearchParams<{ game_status_id: string }>();
  const userGameStatusQuery = useUserGameStatus({
    gameStatusId: game_status_id,
  });
  if (userGameStatusQuery.loading || !userGameStatusQuery.data) {
    return (
      <View>
        <Text size="large" weight="bold" color="primary">
          Trwa ładowanie danych gry...
        </Text>
      </View>
    );
  }
  return (
    <GamesStatusEditForm gameStatus={userGameStatusQuery.data.userGameStatus} />
  );
};
