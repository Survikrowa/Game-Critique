import { useLocalSearchParams } from "expo-router";
import { Card, Image, ScrollView, Spinner, View } from "tamagui";
import { Text } from "ui/typography/text";

import { CollectionDetailsEmpty } from "./collection_details_empty/collection_details_empty";
import { CollectionDetailsFab } from "./collection_details_fab/collection_details_fab";
import { useCollectionDetails } from "./use_collection_details/use_collection_details";
import { useResetCollectionHeaderTitle } from "./use_reset_collection_header_title";
import { useSetHeaderTitle } from "../../../router/use_set_header_title";

import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

export const CollectionDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  useResetCollectionHeaderTitle();

  const collectionDetailQuery = useCollectionDetails({
    id: Number(id) || 0,
  });

  useSetHeaderTitle(collectionDetailQuery.data?.collection.name || "Kolekcja");

  if (collectionDetailQuery.loading || !collectionDetailQuery.data) {
    return <Spinner size="large" />;
  }

  if (collectionDetailQuery.data.collection.games.length === 0) {
    return <CollectionDetailsEmpty />;
  }

  const collection = collectionDetailQuery.data.collection;
  return (
    <VStack className="h-full">
      <ScrollView maxHeight="90%">
        {collection.games.map((game) => {
          return (
            <Card
              key={game.id}
              backgroundColor="$color.container"
              marginBottom={8}
            >
              <Card.Header>
                <HStack className="gap-2 items-center">
                  <View maxHeight={50} maxWidth={50} height="100%">
                    <Image
                      resizeMode="contain"
                      source={{ uri: game?.cover?.bigUrl }}
                      style={{ width: 50, height: 50 }}
                    />
                  </View>
                  <View maxWidth={220}>
                    <Text size="medium" weight="bold" color="primary">
                      {game.name}
                    </Text>
                  </View>
                </HStack>
              </Card.Header>
            </Card>
          );
        })}
      </ScrollView>

      <CollectionDetailsFab />
    </VStack>
  );
};
