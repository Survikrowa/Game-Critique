import { YStack } from "tamagui";

import { IncomingGamesCarousel } from "./incoming_games_carousel/incoming_games_carousel";
import { Text } from "../../ui/typography/text";

export const HomeScreen = () => {
  return (
    <YStack flex={1}>
      <YStack gap={8} padding={8}>
        <Text size="large" weight="bold" color="secondary">
          Nadchodzące premiery
        </Text>
        <IncomingGamesCarousel />
      </YStack>
    </YStack>
  );
};