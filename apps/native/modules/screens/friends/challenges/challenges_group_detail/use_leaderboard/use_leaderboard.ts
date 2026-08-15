import { useAuth0 } from "react-native-auth0";

import { useGroupLeaderboardQuery } from "./leaderboard.query.generated";

export const useLeaderboard = (groupId: number) => {
  const { user } = useAuth0();
  return useGroupLeaderboardQuery({
    variables: { groupId },
    fetchPolicy: "network-only",
    skip: !user,
  });
};
