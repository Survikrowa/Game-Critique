import { ReactNode } from "react";

import { Box } from "@/ui/layout/box/box";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

type HomepageSectionProps = {
  heading: string;
  children: ReactNode;
};

export const HomepageSection = ({
  heading,
  children,
}: HomepageSectionProps) => {
  return (
    <VStack>
      <Text size="extraLarge" weight="bold" color="primary">
        {heading}
      </Text>
      <Box className="mt-3">{children}</Box>
    </VStack>
  );
};
