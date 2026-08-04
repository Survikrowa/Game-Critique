import { useGetNotificationPreferencesQuery } from "../notifications_graphql/get_notification_preferences.generated";
import { useUpdateNotificationPreferencesMutation } from "../notifications_graphql/update_notification_preferences.generated";

interface PreferencesInput {
  friendActivity?: boolean;
  friendInvites?: boolean;
  weeklySummary?: boolean;
  releaseReminders?: boolean;
}

export const useNotificationPreferences = () => {
  const { data, loading, error } = useGetNotificationPreferencesQuery();
  const [updateMutation] = useUpdateNotificationPreferencesMutation();

  const preferences = data?.getNotificationPreferences;

  const update = async (input: PreferencesInput): Promise<void> => {
    await updateMutation({ variables: { input } });
  };

  return { preferences, loading, error, update };
};
