import { Button } from "tamagui";
import { Text } from "ui/typography/text";

import { VStack } from "@/ui/layout/vstack/vstack";

type GamePreparingInfoProps = {
  onRefreshClick: () => void;
};

export const GamePreparingInfo = ({
  onRefreshClick,
}: GamePreparingInfoProps) => {
  return (
    <VStack className="items-center gap-2">
      <Text size="medium" weight="bold" color="primary">
        Gra jest aktualnie pobierana do naszej bazy.
      </Text>
      <Text size="medium" weight="bold" color="primary">
        Spróbuj ponownie za chwilę, klikając w przycisk poniżej.
      </Text>
      <Button
        color="white"
        outlineColor="white"
        backgroundColor="black"
        onPress={onRefreshClick}
      >
        Odśwież
      </Button>
    </VStack>
  );
};
