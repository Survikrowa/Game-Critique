import { Link } from "expo-router";
import { useAuth0 } from "react-native-auth0";
import { YStack, Button } from "tamagui";

import { IncomingGamesCarousel } from "../../modules/homepage/incoming_games_carousel/incoming_games_carousel";
import { Text } from "../../ui/typography/text";

export default function Page() {
  const { clearSession } = useAuth0();
  const logout = async () => await clearSession();
  return (
    <YStack flex={1}>
      <Text size="medium" weight="normal" color="secondary">
        Home Page
        <Link href="/apps/native/app/(app)/auth">Zaloguj się</Link>
        <Button onPress={logout}>Logout</Button>
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
