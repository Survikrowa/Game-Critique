import {
  useFriendsGameReviewsLazyQuery,
  useFriendsGameReviewsQuery,
} from "./friends_game_reviews_query.generated";

type UseFriendsGameReviewsArgs = {
  gameStatusId: number;
};
export const useFriendsGameReviews = ({
  gameStatusId,
}: UseFriendsGameReviewsArgs) => {
  return useFriendsGameReviewsQuery({
    fetchPolicy: "network-only",
    variables: {
      gameStatusId,
    },
  });
};

export const useLazyFriendsGameReviews = ({
  gameStatusId,
}: UseFriendsGameReviewsArgs) => {
  return useFriendsGameReviewsLazyQuery({
    fetchPolicy: "network-only",
    variables: {
      gameStatusId,
    },
  });
};
