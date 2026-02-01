import { ReactNode } from "react";

import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

type GamesStatusFiltersModalSectionProps = {
  title: string;
  children: ReactNode;
};

export const GamesStatusFiltersModalSection = ({
  title,
  children,
}: GamesStatusFiltersModalSectionProps) => {
  return (
    <VStack className="gap-2">
      <Text size="large" weight="bold" color="white">
        {title}
      </Text>
      <HStack>{children}</HStack>
    </VStack>
  );
};
