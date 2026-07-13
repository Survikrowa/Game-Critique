import { useState } from "react";
import { Image, View } from "react-native";

import { GamesStatusListItemButtons } from "./games_status_list_item_buttons/games_status_list_item_buttons";
import { useRemoveGameStatus } from "./games_status_list_item_buttons/use_remove_game_status/use_remove_game_status";
import { GamesStatusListItemStatusBadge } from "./games_status_list_item_status_badge/games_status_list_item_status_badge";
import { GamesStatusListItemStatusMenu } from "./games_status_list_item_status_menu/games_status_list_item_status_menu";
import { GameStatus } from "../../../../../__generated__/types";
import { GameStatusFinishModal } from "../../../../games_status/game_status_finish_modal/game_status_finish_modal";
import { useQuickGameStatusAction } from "../../../../games_status/use_quick_game_status_action/use_quick_game_status_action";
import { useGameStatusStore } from "../../games_status_store/use_games_status_store";

import { truncateString } from "@/modules/strings/truncate_string";
import { ClearButton } from "@/ui/forms/clear_button";
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
  oauthId?: string;
};

export const GamesStatusListItem = ({
  item,
  oauthId,
}: GamesStatusListItemProps) => {
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
      <ClearButton onPress={() => setIsSheetOpen(true)}>
        <VStack className="gap-2">
          <View className="relative">
            <Image
              source={{ uri: item.cover }}
              style={{ width: 112, height: 142, borderRadius: 4 }}
              resizeMode="cover"
            />
            <GamesStatusListItemStatusBadge
              status={item.status}
              onPress={() => setIsStatusMenuOpen(true)}
            />
          </View>
          <VStack>
            <Text size="medium" weight="bold" color="primary">
              {truncateString(item.title, 12)}
            </Text>
            <Text size="small" weight="normal" color="secondary">
              {item.platform}
            </Text>
            {item.score && (
              <Text size="small" weight="bold" color="secondary">
                Ocena: {item.score.replace("-", ",")}
              </Text>
            )}
          </VStack>
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
                oauthId={oauthId}
                onClick={() => {
                  paginationStore.setPagination({
                    skip: 0,
                    take: 9,
                  });
                  setIsSheetOpen(false);
                }}
                onRemoveAccept={removeGameStatus}
              />
            </VStack>
          </Sheet>
        </VStack>
      </ClearButton>
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
