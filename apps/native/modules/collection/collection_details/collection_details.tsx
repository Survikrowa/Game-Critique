import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import {
  Card,
  Image,
  ScrollView,
  Spinner,
  View,
  XStack,
  YStack,
} from "tamagui";
import { Text } from "ui/typography/text";

import { CollectionDetailsEmpty } from "./collection_details_empty/collection_details_empty";
import { CollectionDetailsFab } from "./collection_details_fab/collection_details_fab";
import { useCollectionDetails } from "./use_collection_details/use_collection_details";
import { useResetCollectionHeaderTitle } from "./use_reset_collection_header_title";

export const CollectionDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  useResetCollectionHeaderTitle();

  const collectionDetailQuery = useCollectionDetails({
    id: Number(id) || 0,
  });

  useEffect(() => {
    if (collectionDetailQuery.data?.collection.name) {
      navigation.setOptions({
        title: collectionDetailQuery.data.collection.name,
      });
      return;
    }
    navigation.setOptions({
      title: "",
    });
  }, [collectionDetailQuery.data?.collection.name]);

  if (collectionDetailQuery.loading || !collectionDetailQuery.data) {
    return <Spinner size="large" />;
  }

  if (collectionDetailQuery.data.collection.games.length === 0) {
    return <CollectionDetailsEmpty />;
  }

  const collection = collectionDetailQuery.data.collection;
  return (
    <YStack height="100%">
      <ScrollView maxHeight="90%">
        {collection.games.map((game) => {
          return (
            <Card key={game.id} bordered marginBottom={8}>
              <Card.Background />
              <Card.Header>
                <XStack gap={8} alignItems="center">
                  <View maxHeight={50} maxWidth={50} height="100%">
                    <Image
                      resizeMode="contain"
                      source={{ uri: game.covers.bigUrl }}
                      style={{ width: 50, height: 50 }}
                    />
                  </View>
                  <View maxWidth={220}>
                    <Text size="medium" weight="bold" color="primary">
                      {game.name}
                    </Text>
                  </View>
                </XStack>
              </Card.Header>
            </Card>
          );
        })}
      </ScrollView>

      <CollectionDetailsFab />
    </YStack>
  );
};
