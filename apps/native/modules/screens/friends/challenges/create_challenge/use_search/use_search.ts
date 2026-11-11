import { useAuth0 } from "react-native-auth0";

import { useSearchForChallengeQuery } from "./search_challenge.generated";

export const MIN_SEARCH_LENGTH = 3;

export const useSearchForChallenge = (query: string) => {
  const { user } = useAuth0();
  return useSearchForChallengeQuery({
    variables: { search: query },
    fetchPolicy: "network-only",
    skip: !user || query.trim().length < MIN_SEARCH_LENGTH,
  });
};
