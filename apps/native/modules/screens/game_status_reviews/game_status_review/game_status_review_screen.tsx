import { ScrollView } from "tamagui";

import { Text } from "../../../../ui/typography/text";
import { useSetHeaderTitle } from "../../../router/use_set_header_title";
import { useGameStatusReviewStore } from "../use_game_status_review_store/use_game_status_review_store";

export const GameStatusReviewScreen = () => {
  const { currentReview } = useGameStatusReviewStore((state) => ({
    currentReview: state.currentReview,
  }));

  useSetHeaderTitle(currentReview.authorName);
  return (
    <ScrollView maxHeight="99%" width="100%">
      <Text size="large" weight="normal" color="primary">
        {currentReview.message}
      </Text>
    </ScrollView>
  );
};
