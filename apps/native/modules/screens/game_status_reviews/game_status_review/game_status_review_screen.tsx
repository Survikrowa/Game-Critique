import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollView } from "tamagui";

import { Text } from "../../../../ui/typography/text";
import { useGameStatusReviewStore } from "../use_game_status_review_store/use_game_status_review_store";

export const GameStatusReviewScreen = () => {
  const { currentReview } = useGameStatusReviewStore((state) => ({
    currentReview: state.currentReview,
  }));

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: currentReview.authorName,
    });
  }, [currentReview]);
  return (
    <ScrollView maxHeight="99%" width="100%">
      <Text size="large" weight="normal" color="primary">
        {currentReview.message}
      </Text>
    </ScrollView>
  );
};
