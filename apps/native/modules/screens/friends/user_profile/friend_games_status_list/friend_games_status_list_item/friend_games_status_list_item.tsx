import { useState } from "react";

import { FriendGamesStatusListItemButtonGoToDetails } from "./friend_games_status_list_item_button_go_to_details";
import { GameStatus } from "../../../../../../__generated__/types";
import { GamesStatusCard } from "../../../../games/games_status_list/games_status_card/games_status_card";

import { VStack } from "@/ui/layout/vstack/vstack";
import { Sheet } from "@/ui/panels/sheet/sheet";
import { Text } from "@/ui/typography/text";

type FriendGamesStatusListItemProps = {
  oauthId: string;
  item: {
    title: string;
    platform: string;
    status: GameStatus;
    score: string;
    cover: string;
    id: number;
  };
};

export const FriendGamesStatusListItem = ({
  item,
  oauthId,
}: FriendGamesStatusListItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <GamesStatusCard item={item} onPress={() => setIsSheetOpen(true)} />
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
          <FriendGamesStatusListItemButtonGoToDetails
            gameStatusId={item.id}
            oauthId={oauthId}
            onClick={() => setIsSheetOpen(false)}
          />
        </VStack>
      </Sheet>
    </>
  );
};
