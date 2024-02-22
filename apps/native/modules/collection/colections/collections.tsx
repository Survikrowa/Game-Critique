import { FlatList } from "react-native";
import { Spinner, XStack } from "tamagui";
import { Text } from "ui/typography/text";

import { CollectionCard } from "./collection_card";
import { useGetCollections } from "../use_get_collections/use_get_collections";

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
    <FlatList
      data={query.data.getProfileCollections}
      contentContainerStyle={{
        gap: 8,
        display: "flex",
        height: "100%",
        marginTop: 16,
      }}
      columnWrapperStyle={{ gap: 8, maxHeight: 200, width: "100%" }}
      key="collection"
      numColumns={2}
      initialNumToRender={2}
      renderItem={({ item }) => (
        <CollectionCard
          key={item.id}
          name={item.name}
          description={item.description}
          count={item.counter}
          id={item.id}
        />
      )}
    />
  );
};
