import { Spinner, XStack } from "tamagui";
import { Text } from "ui/typography/text";

export const FriendsActivityLoading = () => {
  return (
    <XStack gap={8} alignItems="center">
      <Text size="medium" weight="normal" color="primary">
        Ładujemy aktywność twoich znajomych...
      </Text>
      <Spinner size="large" />
    </XStack>
  );
};
