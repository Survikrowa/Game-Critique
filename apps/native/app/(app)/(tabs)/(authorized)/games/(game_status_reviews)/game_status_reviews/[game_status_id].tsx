import { BaseScreenLayout } from "../../../../../../../modules/layouts/base_screen_layout/base_screen_layout";
import { GameStatusReviewsScreen } from "../../../../../../../modules/screens/game_status_reviews/game_status_reviews_screen";

const GameStatusReviews = () => {
  return (
    <BaseScreenLayout>
      <GameStatusReviewsScreen
        redirect={{
          review: "games",
        }}
      />
    </BaseScreenLayout>
  );
};

export default GameStatusReviews;
