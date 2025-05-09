import { useState } from "react";
import { Image, YStack } from "tamagui";

import { GamesStatusListItemButtons } from "./games_status_list_item_buttons/games_status_list_item_buttons";
import { useRemoveGameStatus } from "./games_status_list_item_buttons/use_remove_game_status/use_remove_game_status";
import { ClearButton } from "../../../../../ui/forms/clear_button";
import { Sheet } from "../../../../../ui/panels/sheet/sheet";
import { Text } from "../../../../../ui/typography/text";
import { truncateString } from "../../../../strings/truncate_string";
import { useGameStatusStore } from "../../games_status_store/use_games_status_store";

type GamesStatusListItemProps = {
  item: {
    title: string;
    platform: string;
    score: string;
    cover: string;
    id: number;
    achievementsCompleted: boolean;
  };
  oauthId?: string;
};

export const GamesStatusListItem = ({
  item,
  oauthId,
}: GamesStatusListItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [removeGameStatus] = useRemoveGameStatus();

  const paginationStore = useGameStatusStore((state) => ({
    setPagination: state.setPagination,
  }));

  return (
    <ClearButton onPress={() => setIsSheetOpen(true)}>
      <YStack gap={8}>
        <Image
          borderRadius={4}
          source={{ uri: item.cover, width: 112, height: 142 }}
          style={{
            objectFit: "fill",
          }}
        />
        <YStack>
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
        </YStack>
        <Sheet
          onOpenChange={setIsSheetOpen}
          snapPointsMode="constant"
          isOpen={isSheetOpen}
          displayAsModal
        >
          <YStack padding={16} gap={16} alignItems="center">
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
          </YStack>
        </Sheet>
      </YStack>
    </ClearButton>
  );
};
