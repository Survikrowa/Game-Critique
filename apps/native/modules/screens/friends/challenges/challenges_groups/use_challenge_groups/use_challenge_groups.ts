import { useAuth0 } from "react-native-auth0";

import { useChallengeGroupsQuery } from "./challenge_groups.query.generated";

export const useChallengeGroups = () => {
  const { user } = useAuth0();
  return useChallengeGroupsQuery({
    fetchPolicy: "network-only",
    skip: !user,
  });
};
