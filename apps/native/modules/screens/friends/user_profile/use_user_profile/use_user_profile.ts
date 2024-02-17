import { useUserProfileQuery } from "./user_profile_query.generated";

type UseUserProfileArgs = {
  oauthId?: string;
};

export const useUserProfile = ({ oauthId }: UseUserProfileArgs) => {
  return useUserProfileQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      oauthId: oauthId || "",
    },
  });
};
