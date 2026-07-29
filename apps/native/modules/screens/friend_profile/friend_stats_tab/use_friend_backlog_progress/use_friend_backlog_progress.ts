import { useFriendBacklogProgressQuery } from "./friend_stats.generated";

type UseFriendBacklogProgressArgs = {
  oauthId: string;
  year: number;
};

export const useFriendBacklogProgress = ({
  oauthId,
  year,
}: UseFriendBacklogProgressArgs) => {
  return useFriendBacklogProgressQuery({
    variables: { oauthId, year },
  });
};
