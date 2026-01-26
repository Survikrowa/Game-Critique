import { ReactNode } from "react";

import { Box } from "@/ui/layout/box/box";
import { VStack } from "@/ui/layout/vstack/vstack";
import { GText } from "@/ui/typography/text";

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
      <GText size="2xl" bold className="my-4">
        {heading}
      </GText>
      <Box>{children}</Box>
    </VStack>
  );
};
