import { useFriendYearlySummaryQuery } from "./friend_stats.generated";

type UseFriendYearlySummaryArgs = {
  oauthId: string;
  year: number | null;
};

export const useFriendYearlySummary = ({
  oauthId,
  year,
}: UseFriendYearlySummaryArgs) => {
  return useFriendYearlySummaryQuery({
    variables: { oauthId, year },
  });
};
