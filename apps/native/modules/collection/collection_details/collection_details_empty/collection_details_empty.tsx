import { View, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import EmptyCollection from "../assets/empty_collection.svg";
import { CollectionDetailsFab } from "../collection_details_fab/collection_details_fab";
export const CollectionDetailsEmpty = () => {
  return (
    <YStack height="100%" alignItems="center" justifyContent="center">
      <View maxWidth={120} maxHeight={120} alignItems="center">
        <EmptyCollection width={280} height={120} />
      </View>
      <Text size="large" weight="bold" color="primary">
        Nie masz żadnych przedmiotów w kolekcji
      </Text>
      <Text size="small" weight="normal" color="secondary">
        Użyj przycisku by coś dodać!
      </Text>
      <CollectionDetailsFab />
    </YStack>
  );
};
