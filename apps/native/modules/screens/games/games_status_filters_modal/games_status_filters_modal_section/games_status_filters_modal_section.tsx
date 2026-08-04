import { ReactNode } from "react";

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
    <VStack className="gap-2 w-full">
      <Text size="large" weight="bold" color="white">
        {title}
      </Text>
      {children}
    </VStack>
  );
};
