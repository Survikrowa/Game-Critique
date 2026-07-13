import { Bookmark, CheckCircle2, Play } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable } from "react-native";

import { GameStatus } from "../../../../__generated__/types";
import { GameStatusFinishModal } from "../../../games_status/game_status_finish_modal/game_status_finish_modal";
import { useLastPlatform } from "../../../games_status/use_last_platform/use_last_platform";
import { useQuickGameStatusAction } from "../../../games_status/use_quick_game_status_action/use_quick_game_status_action";
import { haptic } from "../../../haptics/haptic";

import { ButtonWithIcon } from "@/ui/forms/button_icon";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Sheet } from "@/ui/panels/sheet/sheet";
import { Text } from "@/ui/typography/text";

type Platform = {
  id: number;
  name: string;
};

type GameStatusQuickActionsProps = {
  game: {
    id: number;
    platforms: Platform[];
  };
  onSuccess?: () => void;
};

export const GameStatusQuickActions = ({
  game,
  onSuccess,
}: GameStatusQuickActionsProps) => {
  const [isPlatformSheetOpen, setIsPlatformSheetOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<GameStatus | null>(null);
  const [pendingPlatform, setPendingPlatform] = useState<Platform | null>(null);
  const { performQuickAction, loading } = useQuickGameStatusAction();
  const { lastPlatform } = useLastPlatform();

  const sortedPlatforms = useMemo(() => {
    const preferred = game.platforms.find((p) => p.id === lastPlatform?.id);
    if (!preferred) return game.platforms;
    return [preferred, ...game.platforms.filter((p) => p.id !== preferred.id)];
  }, [game.platforms, lastPlatform]);

  const handlePress = async (status: GameStatus) => {
    haptic.medium();

    const platform = game.platforms.length === 1 ? game.platforms[0] : null;

    if (status === GameStatus.Completed) {
      if (platform) {
        setPendingPlatform(platform);
      }
      setPendingStatus(status);
      if (!platform) {
        setIsPlatformSheetOpen(true);
      }
      return;
    }

    if (platform) {
      const success = await performQuickAction({
        gameId: game.id,
        platformId: platform.id,
        platformName: platform.name,
        status,
      });

      if (success) {
        onSuccess?.();
      }
      return;
    }

    setPendingStatus(status);
    setIsPlatformSheetOpen(true);
  };

  const handleSelectPlatform = async (platform: Platform) => {
    if (!pendingStatus) return;

    if (pendingStatus === GameStatus.Completed) {
      setPendingPlatform(platform);
      setIsPlatformSheetOpen(false);
      return;
    }

    const success = await performQuickAction({
      gameId: game.id,
      platformId: platform.id,
      platformName: platform.name,
      status: pendingStatus,
    });

    if (success) {
      setIsPlatformSheetOpen(false);
      setPendingStatus(null);
      onSuccess?.();
    }
  };

  const handleConfirmFinishStatus = async ({
    score,
    review,
  }: {
    score?: string;
    review?: string;
  }) => {
    if (!pendingPlatform) return;

    const success = await performQuickAction({
      gameId: game.id,
      platformId: pendingPlatform.id,
      platformName: pendingPlatform.name,
      status: GameStatus.Completed,
      score,
      review,
    });

    if (success) {
      setPendingStatus(null);
      setPendingPlatform(null);
      onSuccess?.();
    }
  };

  return (
    <>
      <HStack className="gap-2">
        <ButtonWithIcon
          action="positive"
          className="flex-1 min-h-[44px]"
          icon={<Play size={18} color="#fff" />}
          onPress={() => handlePress(GameStatus.InProgress)}
        >
          Gram teraz
        </ButtonWithIcon>
        <ButtonWithIcon
          action="secondary"
          className="flex-1 min-h-[44px]"
          icon={<Bookmark size={18} color="#fff" />}
          onPress={() => handlePress(GameStatus.Backlog)}
        >
          Backlog
        </ButtonWithIcon>
        <ButtonWithIcon
          action="primary"
          className="flex-1 min-h-[44px]"
          icon={<CheckCircle2 size={18} color="#fff" />}
          onPress={() => handlePress(GameStatus.Completed)}
        >
          Ukończone
        </ButtonWithIcon>
      </HStack>

      <Sheet
        isOpen={isPlatformSheetOpen}
        onOpenChange={setIsPlatformSheetOpen}
        snapPointsMode="constant"
        displayAsModal
      >
        <VStack className="p-4 gap-2">
          <Text size="large" weight="bold" color="primary">
            Wybierz platformę
          </Text>
          {sortedPlatforms.map((platform) => (
            <Pressable
              key={platform.id}
              disabled={loading}
              onPress={() => handleSelectPlatform(platform)}
              className="px-4 py-3 rounded-xl min-h-[44px] justify-center bg-background-100"
            >
              <Text size="medium" weight="normal" color="primary">
                {platform.name}
              </Text>
            </Pressable>
          ))}
        </VStack>
      </Sheet>

      <GameStatusFinishModal
        status={GameStatus.Completed}
        isOpen={
          Boolean(pendingPlatform) && pendingStatus === GameStatus.Completed
        }
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setPendingStatus(null);
            setPendingPlatform(null);
          }
        }}
        isSubmitting={loading}
        onConfirm={handleConfirmFinishStatus}
      />
    </>
  );
};
