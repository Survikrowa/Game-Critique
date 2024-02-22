import { Edit3 } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { View, YStack } from "tamagui";

import { RemoveGameStatusAction } from "./remove_game_status_action/remove_game_status_action";

type GameStatusTabContentItemLeftContentProps = {
  gameStatusId: number;
};

export const GameStatusTabContentItemLeftContent = ({
  gameStatusId,
}: GameStatusTabContentItemLeftContentProps) => {
  return (
    <YStack
      justifyContent="center"
      alignItems="center"
      marginBottom={16}
      gap={4}
    >
      <View
        onPress={() =>
          router.push(`/games/games_status_edit_form/${gameStatusId}`)
        }
      >
        <Edit3 color="white" />
      </View>
      <RemoveGameStatusAction gameStatusId={gameStatusId} />
    </YStack>
  );
};
