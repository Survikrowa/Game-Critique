import { useCheckReminderStatusQuery } from "../release_reminders_graphql/check_reminder_status.generated";
import { useGetUserRemindersQuery } from "../release_reminders_graphql/get_user_reminders.generated";

export const useUserReminders = () => {
  return useGetUserRemindersQuery();
};

export const useCheckReminderStatus = (igdbId: number) => {
  const { data } = useCheckReminderStatusQuery({
    variables: { igdbId },
    skip: !igdbId,
  });
  return data?.checkReminderStatus ?? false;
};
