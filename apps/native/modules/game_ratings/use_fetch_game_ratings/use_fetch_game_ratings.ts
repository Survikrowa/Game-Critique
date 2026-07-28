import { useFetchGameRatingsMutation } from "../fetch_game_ratings_graphql/fetch_game_ratings.generated";

export const useFetchGameRatings = () => {
  const [fetch, { loading, error }] = useFetchGameRatingsMutation();
  return { fetch, loading, error };
};
