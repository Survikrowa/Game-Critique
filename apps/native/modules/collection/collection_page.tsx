import { router } from "expo-router";
import { Button, Card, XStack, YStack } from "tamagui";

import { Text } from "../../ui/typography/text";

export const CollectionPage = () => {
  return (
    <YStack padding={8}>
      <XStack padding={8}>
        <Text size="extraLarge" weight="bold" color="secondary">
          Twoja kolekcja
        </Text>
      </XStack>
      <XStack maxWidth={240} padding={8}>
        <Button
          color="white"
          outlineColor="white"
          backgroundColor="black"
          width="100%"
          onPress={() => router.push("/collection/new_collection")}
        >
          Utwórz nową kolekcje
        </Button>
      </XStack>
      <YStack padding={8} gap={8} height="100%">
        <Card elevate size="$4" bordered height={120} width="auto">
          <Card.Background />
          <Card.Header padded>
            <Text size="large" weight="bold" color="secondary">
              Gry na nintendo Switch
            </Text>
            <Text size="large" weight="bold" color="secondary">
              Nie ma
            </Text>
          </Card.Header>
        </Card>
        <Card elevate size="$4" bordered height={140} width="auto">
          <Card.Background />
          <Card.Header padded>
            <Text size="large" weight="bold" color="secondary">
              Amiibo
            </Text>
          </Card.Header>
        </Card>
        <Card elevate size="$4" bordered height={140} width="auto">
          <Card.Background />
          <Card.Header padded>
            <Text size="large" weight="bold" color="secondary">
              Gry na PlayStation 5
            </Text>
          </Card.Header>
        </Card>
      </YStack>
    </YStack>
  );
};
