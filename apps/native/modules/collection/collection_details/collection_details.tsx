import { useLocalSearchParams, useNavigation } from "expo-router";
import { Spinner, XStack, YStack } from "tamagui";
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
    onSuccess: (data) =>
      navigation.setOptions({
        title: data.collection.name,
      }),
  });

  if (collectionDetailQuery.loading || !collectionDetailQuery.data) {
    return <Spinner size="large" />;
  }

  const collection = collectionDetailQuery.data.collection;
  console.log(collection.games);
  return (
    <YStack height="100%">
      <Text size="extraLarge" weight="semiBold" color="secondary">
        {id}
      </Text>
      <XStack flex={1} justifyContent="center" alignItems="center">
        <XStack position="absolute" bottom={10} right={10}>
          <CollectionDetailsFab />
        </XStack>
      </XStack>
    </YStack>
  );
};
