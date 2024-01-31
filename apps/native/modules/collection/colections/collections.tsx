import { ScrollView, Spinner, XStack, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { CollectionCard } from "./collection_card";
import { useGetCollections } from "./use_get_collections/use_get_collections";

export const Collections = () => {
  const query = useGetCollections();
  if (query.loading || !query.data) {
    return (
      <XStack>
        <Text size="extraLarge" weight="bold" color="secondary">
          Trwa ładowanie kolekcji...
          <Spinner size="large" />
        </Text>
      </XStack>
    );
  }
  return (
    <ScrollView maxHeight="90%">
      <YStack padding={8} gap={8} height="100%">
        {query.data.getProfileCollections.map((collection) => (
          <CollectionCard
            key={collection.id}
            name={collection.name}
            description={collection.description}
            count={collection.counter}
            id={collection.id}
          />
        ))}
      </YStack>
    </ScrollView>
  );
};
