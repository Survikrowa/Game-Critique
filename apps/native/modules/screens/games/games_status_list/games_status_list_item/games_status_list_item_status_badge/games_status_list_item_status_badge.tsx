import { Pressable } from "react-native";

import { getGameStatusVisual } from "../games_status_visuals";

import { GameStatus } from "@/__generated__/types";

type GamesStatusListItemStatusBadgeProps = {
  status: GameStatus;
  onPress: () => void;
};

export const GamesStatusListItemStatusBadge = ({
  status,
  onPress,
}: GamesStatusListItemStatusBadgeProps) => {
  const visual = getGameStatusVisual(status);

  return (
    <Pressable
      onPress={onPress}
      className="absolute top-2 left-2 w-9 h-9 rounded-full items-center justify-center bg-background-0"
    >
      {visual.icon(visual.color, 18)}
    </Pressable>
  );
};
