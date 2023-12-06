import { Link } from "expo-router";
import { YStack } from "tamagui";

import { IncomingGamesCarousel } from "../modules/homepage/incoming_games_carousel/incoming_games_carousel";
import { Text } from "../ui/typography/text";

export default function Page() {
  return (
    <YStack flex={1}>
      <Text size="medium" weight="normal" color="secondary">
        Home Page
        <Link href="/auth">Zaloguj się</Link>
      </Text>
      <YStack gap={8} padding={8}>
        <Text size="large" weight="bold" color="secondary">
          Nadchodzące premiery
        </Text>
        <IncomingGamesCarousel />
      </YStack>
    </YStack>
  );
}
