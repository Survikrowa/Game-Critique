import { router } from "expo-router";
import { Button, XStack, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { Collections } from "./colections/collections";

export const CollectionPage = () => {
  return (
    <YStack padding={8}>
      <XStack padding={8}>
        <Text size="extraLarge" weight="bold" color="primary">
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
      <Collections />
    </YStack>
  );
};
