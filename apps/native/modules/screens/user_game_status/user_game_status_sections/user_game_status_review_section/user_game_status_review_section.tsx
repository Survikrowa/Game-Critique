import { ScrollView } from "react-native";
import { Text } from "ui/typography/text";

import { VStack } from "@/ui/layout/vstack/vstack";

type UserGameStatusReviewSectionProps = {
  review: string;
};

export const UserGameStatusReviewSection = ({
  review,
}: UserGameStatusReviewSectionProps) => {
  return (
    <VStack className="items-center gap-2">
      <Text size="large" weight="bold" color="primary">
        Moja recenzja:
      </Text>
      <ScrollView className="max-h-[300px]" nestedScrollEnabled>
        <Text size="medium" weight="normal" color="primary">
          {review}
        </Text>
      </ScrollView>
    </VStack>
  );
};
