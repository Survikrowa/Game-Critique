import { useState } from "react";
import { router } from "expo-router";

import { GamesStatusListItemButtons } from "./games_status_list_item_buttons/games_status_list_item_buttons";
import { useRemoveGameStatus } from "./games_status_list_item_buttons/use_remove_game_status/use_remove_game_status";
import { GamesStatusListItemStatusMenu } from "./games_status_list_item_status_menu/games_status_list_item_status_menu";
import { GameStatus } from "../../../../../__generated__/types";
import { GameStatusFinishModal } from "../../../../games_status/game_status_finish_modal/game_status_finish_modal";
import { useQuickGameStatusAction } from "../../../../games_status/use_quick_game_status_action/use_quick_game_status_action";
import {
  GAMES_STATUS_RESET_TAKE,
  useGameStatusStore,
} from "../../games_status_store/use_games_status_store";
import { GamesStatusCard } from "../games_status_card/games_status_card";

import { haptic } from "@/modules/haptics/haptic";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Sheet } from "@/ui/panels/sheet/sheet";
import { Text } from "@/ui/typography/text";

type GamesStatusListItemProps = {
  item: {
    title: string;
    platform: string;
    platformId: number;
    status: GameStatus;
    score: string;
    cover: string;
    id: number;
    gameId: number;
    achievementsCompleted: boolean;
  };
};

export const GamesStatusListItem = ({ item }: GamesStatusListItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [finishStatus, setFinishStatus] = useState<GameStatus | null>(null);
  const [removeGameStatus] = useRemoveGameStatus();
  const { performQuickAction, loading: isSubmittingQuickAction } =
    useQuickGameStatusAction();

  const paginationStore = useGameStatusStore((state) => ({
    setPagination: state.setPagination,
  }));

  const handleSelectStatus = (status: GameStatus) => {
    setIsStatusMenuOpen(false);

    if (status === GameStatus.Completed || status === GameStatus.Retired) {
      setFinishStatus(status);
      return;
    }

    performQuickAction({
      gameId: item.gameId,
      platformId: item.platformId,
      platformName: item.platform,
      status,
      gameStatusId: item.id,
    });
  };

  const handleConfirmFinishStatus = async ({
    score,
    review,
  }: {
    score?: string;
    review?: string;
  }) => {
    if (!finishStatus) return;

    const success = await performQuickAction({
      gameId: item.gameId,
      platformId: item.platformId,
      platformName: item.platform,
      status: finishStatus,
      gameStatusId: item.id,
      score,
      review,
    });

    if (success) {
      setFinishStatus(null);
    }
  };

  return (
    <>
      <GamesStatusCard
        item={item}
        onPress={() => {
          haptic.light();
          router.push(`/games/game/${item.gameId}`);
        }}
        onBadgePress={() => setIsStatusMenuOpen(true)}
        onMorePress={() => setIsSheetOpen(true)}
      />
      <Sheet
        onOpenChange={setIsSheetOpen}
        snapPointsMode="constant"
        isOpen={isSheetOpen}
        displayAsModal
      >
        <VStack className="p-4 gap-4 items-center">
          <Text size="medium" weight="bold" color="primary">
            {item.title}
          </Text>
          <GamesStatusListItemButtons
            gameStatusId={item.id}
            onClick={() => {
              paginationStore.setPagination({
                skip: 0,
                take: GAMES_STATUS_RESET_TAKE,
              });
              setIsSheetOpen(false);
            }}
            onRemoveAccept={removeGameStatus}
          />
        </VStack>
      </Sheet>
      <Sheet
        isOpen={isStatusMenuOpen}
        onOpenChange={setIsStatusMenuOpen}
        snapPointsMode="constant"
        displayAsModal
      >
        <GamesStatusListItemStatusMenu
          currentStatus={item.status}
          onSelectStatus={handleSelectStatus}
        />
      </Sheet>
      <GameStatusFinishModal
        status={finishStatus}
        isOpen={Boolean(finishStatus)}
        onOpenChange={(isOpen) => {
          if (!isOpen) setFinishStatus(null);
        }}
        isSubmitting={isSubmittingQuickAction}
        onConfirm={handleConfirmFinishStatus}
      />
    </>
  );
};
