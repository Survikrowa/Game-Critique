import { ReactNode } from "react";
import { XStack, YStack } from "tamagui";

import { Text } from "../../../../../ui/typography/text";

type GamesStatusFiltersModalSectionProps = {
  title: string;
  children: ReactNode;
};

export const GamesStatusFiltersModalSection = ({
  title,
  children,
}: GamesStatusFiltersModalSectionProps) => {
  return (
    <YStack gap={8}>
      <Text size="large" weight="bold" color="white">
        {title}
      </Text>
      <XStack>{children}</XStack>
    </YStack>
  );
};
