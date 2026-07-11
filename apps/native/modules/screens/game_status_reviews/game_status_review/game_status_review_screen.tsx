import { ScrollView } from "react-native";

import { Text } from "../../../../ui/typography/text";
import { useSetHeaderTitle } from "../../../router/use_set_header_title";
import { useGameStatusReviewStore } from "../use_game_status_review_store/use_game_status_review_store";

export const GameStatusReviewScreen = () => {
  const { currentReview } = useGameStatusReviewStore((state) => ({
    currentReview: state.currentReview,
  }));

  useSetHeaderTitle(currentReview.authorName);
  return (
    <ScrollView className="max-h-[99%] w-full">
      <Text size="large" weight="normal" color="primary">
        {currentReview.message}
      </Text>
    </ScrollView>
  );
};
