import { Card } from "tamagui";

import { NewCollectionForm } from "./new_collection_form/new_collection_form";

import { VStack } from "@/ui/layout/vstack/vstack";

export const NewCollectionPage = () => {
  return (
    <VStack className="p-2">
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
    </VStack>
  );
};
