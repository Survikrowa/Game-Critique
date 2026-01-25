import { Text } from "ui/typography/text";

import { VStack } from "@/ui/layout/vstack/vstack";

export const FriendsSearchEmpty = () => {
  return (
    <VStack className="items-center m-2">
      <Text size="large" weight="normal" color="primary">
        Brak wyników
      </Text>
    </VStack>
  );
};
