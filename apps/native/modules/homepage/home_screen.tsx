import { ScrollView, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { FriendsActivity } from "./friends_activity/friends_activity";
import { IncomingGamesCarousel } from "./incoming_games_carousel/incoming_games_carousel";

export const HomeScreen = () => {
  return (
    <YStack gap={8}>
      <YStack gap={8} maxHeight={280}>
        <Text size="large" weight="bold" color="primary">
          Nadchodzące premiery
        </Text>
        <IncomingGamesCarousel />
      </YStack>
      <FriendsActivity />
    </YStack>
  );
};
