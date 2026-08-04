import { useCallback } from "react";

import { useAddReminderMutation } from "../release_reminders_graphql/add_reminder.generated";
import { CheckReminderStatusDocument } from "../release_reminders_graphql/check_reminder_status.generated";
import { useRemoveReminderMutation } from "../release_reminders_graphql/remove_reminder.generated";

import { haptic } from "@/modules/haptics/haptic";

type UseReminderActionResult = {
  addReminder: (input: {
    igdbId: number;
    gameName: string;
    gameUrl: string;
    releaseDate: string;
    coverUrl?: string;
  }) => Promise<void>;
  removeReminder: (igdbId: number) => Promise<void>;
  loadingAdd: boolean;
  loadingRemove: boolean;
};

export const useReminderAction = (): UseReminderActionResult => {
  const [add, { loading: loadingAdd }] = useAddReminderMutation();
  const [remove, { loading: loadingRemove }] = useRemoveReminderMutation();

  const addReminder = useCallback(
    async (input: {
      igdbId: number;
      gameName: string;
      gameUrl: string;
      releaseDate: string;
      coverUrl?: string;
    }) => {
      haptic.medium();
      await add({
        variables: { input },
        update: (cache) => {
          cache.writeQuery({
            query: CheckReminderStatusDocument,
            variables: { igdbId: input.igdbId },
            data: { checkReminderStatus: true },
          });
        },
      });
    },
    [add],
  );

  const removeReminder = useCallback(
    async (igdbId: number) => {
      haptic.medium();
      await remove({
        variables: { igdbId },
        update: (cache) => {
          cache.writeQuery({
            query: CheckReminderStatusDocument,
            variables: { igdbId },
            data: { checkReminderStatus: false },
          });
        },
      });
    },
    [remove],
  );

  return { addReminder, removeReminder, loadingAdd, loadingRemove };
};
