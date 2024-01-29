import { useUpdateUserProfileMutation } from "./update_user_profile_mutation.generated";

export const useUpdateUserProfile = () => {
  return useUpdateUserProfileMutation({
    refetchQueries: ["ProfileInfo"],
  });
};
