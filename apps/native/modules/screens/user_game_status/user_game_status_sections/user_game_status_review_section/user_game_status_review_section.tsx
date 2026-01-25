import { ScrollView, YStack } from "tamagui";
import { Text } from "ui/typography/text";

type UserGameStatusReviewSectionProps = {
  review: string;
};

export const UserGameStatusReviewSection = ({
  review,
}: UserGameStatusReviewSectionProps) => {
  return (
    <VStack alignItems="center" gap={8}>
      <Text size="large" weight="bold" color="primary">
        Moja recenzja:
      </Text>
      <ScrollView maxHeight={300} nestedScrollEnabled>
        <Text size="medium" weight="normal" color="primary">
          {review}
        </Text>
      </ScrollView>
    </VStack>
  );
};
