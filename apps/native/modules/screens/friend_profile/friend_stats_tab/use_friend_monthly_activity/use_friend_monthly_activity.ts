import { useFriendMonthlyActivityQuery } from "./friend_stats.generated";

type UseFriendMonthlyActivityArgs = {
  oauthId: string;
  year: number | null;
};

export const useFriendMonthlyActivity = ({
  oauthId,
  year,
}: UseFriendMonthlyActivityArgs) => {
  return useFriendMonthlyActivityQuery({
    variables: { oauthId, year },
  });
};
