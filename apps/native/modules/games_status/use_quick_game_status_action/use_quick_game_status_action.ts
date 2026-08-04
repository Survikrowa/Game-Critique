import { useCallback } from "react";
import { useToastController } from "ui/feedback/toast/use_toast_controller";

import { GameStatus } from "../../../__generated__/types";
import { haptic } from "../../haptics/haptic";
import { useUpsertGameStatus } from "../games_status_form/use_upsert_game_status/use_upsert_game_status";
import { useLastPlatform } from "../use_last_platform/use_last_platform";

type QuickGameStatusActionArgs = {
  gameId: number;
  platformId: number;
  platformName: string;
  status: GameStatus;
  gameStatusId?: number;
  score?: string;
  review?: string;
};

/**
 * Minimal-payload upsert used by Quick Add flows (swipe quick-status,
 * sticky CTA on GameScreen) — skips hours/platinium fields; review is
 * optional and passed through when provided (Completed/Retired flows).
 */
export const useQuickGameStatusAction = () => {
  const [upsertGameStatus, { loading }] = useUpsertGameStatus();
  const { setLastPlatform } = useLastPlatform();
  const toastController = useToastController();

  const performQuickAction = useCallback(
    async ({
      gameId,
      platformId,
      platformName,
      status,
      gameStatusId,
      score,
      review,
    }: QuickGameStatusActionArgs) => {
      const { errors } = await upsertGameStatus({
        variables: {
          input: {
            gameId,
            platformId,
            gameStatus: status,
            isEditing: Boolean(gameStatusId),
            gamesStatusId: gameStatusId,
            achievementsCompleted: false,
            score,
            review,
          },
        },
      });

      if (!errors || errors.length === 0) {
        setLastPlatform({ id: platformId, name: platformName });
        haptic.success();
        toastController.show("Zapisano status gry", {
          description: "",
          variant: "success",
        });
        return true;
      }

      haptic.error();
      return false;
    },
    [upsertGameStatus, setLastPlatform, toastController],
  );

  return { performQuickAction, loading };
};
