import { useFriendStreakQuery } from "./friend_stats.generated";

type UseFriendStreakArgs = {
  oauthId: string;
};

export const useFriendStreak = ({ oauthId }: UseFriendStreakArgs) => {
  return useFriendStreakQuery({
    variables: { oauthId },
  });
};
