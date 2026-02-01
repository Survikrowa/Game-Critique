import { useState } from "react";
import { Image } from "tamagui";

import { GamesStatusListItemButtons } from "./games_status_list_item_buttons/games_status_list_item_buttons";
import { useRemoveGameStatus } from "./games_status_list_item_buttons/use_remove_game_status/use_remove_game_status";
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
      <VStack className="gap-2">
        <Image
          borderRadius={4}
          source={{ uri: item.cover, width: 112, height: 142 }}
          style={{
            objectFit: "fill",
          }}
        />
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
  );
};
