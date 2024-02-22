import { Card, YStack } from "tamagui";

import { NewCollectionForm } from "./new_collection_form/new_collection_form";

export const NewCollectionPage = () => {
  return (
    <YStack padding={8}>
      <Card
        size="$4"
        width="100%"
        display="flex"
        alignItems="center"
        padding={8}
        backgroundColor="$color.container"
      >
        <NewCollectionForm />
      </Card>
    </YStack>
  );
};
