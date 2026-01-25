import { View } from "tamagui";
import { Text } from "ui/typography/text";

import { EmptyCollection } from "../assets/empty_collection";
import { CollectionDetailsFab } from "../collection_details_fab/collection_details_fab";

import { VStack } from "@/ui/layout/vstack/vstack";
export const CollectionDetailsEmpty = () => {
  return (
    <VStack className="h-full items-center justify-center">
      <View maxWidth={120} maxHeight={120} alignItems="center">
        <EmptyCollection />
      </View>
      <Text size="large" weight="bold" color="primary">
        Nie masz żadnych przedmiotów w kolekcji
      </Text>
      <Text size="small" weight="normal" color="secondary">
        Użyj przycisku by coś dodać!
      </Text>
      <CollectionDetailsFab />
    </VStack>
  );
};
