import { Pressable } from "react-native";

import { GAME_STATUS_VISUALS } from "../games_status_visuals";

import { GameStatus } from "@/__generated__/types";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

type GamesStatusListItemStatusMenuProps = {
  currentStatus: GameStatus;
  onSelectStatus: (status: GameStatus) => void;
};

export const GamesStatusListItemStatusMenu = ({
  currentStatus,
  onSelectStatus,
}: GamesStatusListItemStatusMenuProps) => {
  return (
    <VStack className="p-4 gap-2">
      <Text size="large" weight="bold" color="primary">
        Zmień status gry
      </Text>
      {GAME_STATUS_VISUALS.map(
        ({ status, label, icon, color, bgClassName }) => {
          const isActive = status === currentStatus;
          return (
            <Pressable
              key={status}
              disabled={isActive}
              onPress={() => onSelectStatus(status)}
              className={`flex-row items-center gap-3 px-4 py-3 rounded-xl min-h-[44px] ${bgClassName} ${
                isActive ? "opacity-50" : "opacity-100"
              }`}
            >
              {icon(color, 20)}
              <Text size="medium" weight="normal" color="primary">
                {label}
                {isActive ? " (obecny)" : ""}
              </Text>
            </Pressable>
          );
        },
      )}
    </VStack>
  );
};
