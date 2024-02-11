import { Edit3, Trash } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { View, YStack } from "tamagui";

type GameStatusTabContentItemLeftContentProps = {
  gameStatusId: number;
};

export const GameStatusTabContentItemLeftContent = ({
  gameStatusId,
}: GameStatusTabContentItemLeftContentProps) => {
  return (
    <YStack justifyContent="center" marginBottom={16} gap={4}>
      <View
        onPress={() =>
          router.push(`/games/games_status_edit_form/${gameStatusId}`)
        }
      >
        <Edit3 />
      </View>
      <View>
        <Trash />
      </View>
    </YStack>
  );
};
