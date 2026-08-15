import { useAuth0 } from "react-native-auth0";

import { useChallengesQuery } from "./challenges.query.generated";

import type { ChallengeStatus } from "@/__generated__/types";

export const useChallenges = (groupId: number, status?: ChallengeStatus) => {
  const { user } = useAuth0();
  return useChallengesQuery({
    variables: { groupId, status },
    fetchPolicy: "network-only",
    skip: !user,
  });
};
