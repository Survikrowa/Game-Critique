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

  const collection = collectionDetailQuery.data.collection;
  console.log(collection.games);
  return (
    <YStack height="100%" padding={16}>
      <ScrollView maxHeight="90%">
        {collection.games.map((game) => {
          return (
            <Card key={game.id} bordered marginBottom={8}>
              <Card.Background />
              <Card.Header>
                <XStack gap={8}>
                  <View maxHeight={200} maxWidth={200} height="100%">
                    <Image
                      resizeMode="contain"
                      source={{ uri: game.covers.bigUrl }}
                      style={{ width: 120, height: 120 }}
                    />
                  </View>

                  <Text size="medium" weight="bold" color="primary">
                    {game.name}
                  </Text>
                </XStack>
              </Card.Header>
            </Card>
          );
        })}
      </ScrollView>

      <XStack flex={1} justifyContent="center" alignItems="center">
        <XStack position="absolute" bottom={10} right={10}>
          <CollectionDetailsFab />
        </XStack>
      </XStack>
    </YStack>
  );
};
