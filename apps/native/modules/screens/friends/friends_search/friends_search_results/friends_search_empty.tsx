import { YStack } from "tamagui";
import { Text } from "ui/typography/text";

export const FriendsSearchEmpty = () => {
  return (
    <YStack alignItems="center" marginTop={8}>
      <Text size="large" weight="normal" color="primary">
        Brak wyników
      </Text>
    </YStack>
  );
};
