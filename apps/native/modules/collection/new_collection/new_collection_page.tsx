import { Card, YStack } from "tamagui";

import { NewCollectionForm } from "./new_collection_form/new_collection_form";

export const NewCollectionPage = () => {
  return (
    <YStack padding={8}>
      <Card
        elevate
        size="$4"
        bordered
        width="100%"
        display="flex"
        alignItems="center"
        padding={8}
      >
        <Card.Background />
        <NewCollectionForm />
      </Card>
    </YStack>
  );
};
