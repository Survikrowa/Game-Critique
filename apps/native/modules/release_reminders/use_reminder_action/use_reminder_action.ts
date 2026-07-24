import { useCallback } from "react";

import { useAddReminderMutation } from "../release_reminders_graphql/add_reminder.generated";
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
};

export const useReminderAction = (): UseReminderActionResult => {
  const [add] = useAddReminderMutation();
  const [remove] = useRemoveReminderMutation();

  const addReminder = useCallback(
    async (input: {
      igdbId: number;
      gameName: string;
      gameUrl: string;
      releaseDate: string;
      coverUrl?: string;
    }) => {
      haptic.medium();
      await add({ variables: { input } });
    },
    [add],
  );

  const removeReminder = useCallback(
    async (igdbId: number) => {
      haptic.medium();
      await remove({ variables: { igdbId } });
    },
    [remove],
  );

  return { addReminder, removeReminder };
};
