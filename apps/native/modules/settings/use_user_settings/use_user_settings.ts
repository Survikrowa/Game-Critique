import { useGetUserSettingsQuery } from "../settings_graphql/get_user_settings.generated";
import { useUpdateUserSettingsMutation } from "../settings_graphql/update_user_settings.generated";

export const useUserSettings = () => {
  const { data, loading, error, refetch } = useGetUserSettingsQuery();
  const [updateMutation] = useUpdateUserSettingsMutation({
    refetchQueries: ["IncomingGames"],
  });

  const platformIds = data?.getUserSettings?.platformIds ?? [];

  const update = async (newPlatformIds: number[]): Promise<void> => {
    await updateMutation({ variables: { platformIds: newPlatformIds } });
  };

  return { platformIds, loading, error, update, refetch };
};
