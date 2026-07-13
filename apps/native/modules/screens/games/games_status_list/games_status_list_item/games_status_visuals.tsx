import { Bookmark, CheckCircle2, Play, XCircle } from "lucide-react-native";

import { GameStatus } from "../../../../../__generated__/types";
import { mapGameStatusToLabel } from "../../../../games_status/map_game_status_to_label";

export type GameStatusVisual = {
  status: GameStatus;
  label: string;
  icon: (color: string, size?: number) => JSX.Element;
  color: string;
  bgClassName: string;
};

export const GAME_STATUS_VISUALS: GameStatusVisual[] = [
  {
    status: GameStatus.Completed,
    label: mapGameStatusToLabel(GameStatus.Completed),
    icon: (color, size = 20) => <CheckCircle2 size={size} color={color} />,
    color: "#22C55E",
    bgClassName: "bg-success-500/20",
  },
  {
    status: GameStatus.InProgress,
    label: mapGameStatusToLabel(GameStatus.InProgress),
    icon: (color, size = 18) => <Play size={size} color={color} />,
    color: "#3B82F6",
    bgClassName: "bg-info-500/20",
  },
  {
    status: GameStatus.Backlog,
    label: mapGameStatusToLabel(GameStatus.Backlog),
    icon: (color, size = 18) => <Bookmark size={size} color={color} />,
    color: "#F59E0B",
    bgClassName: "bg-warning-500/20",
  },
  {
    status: GameStatus.Retired,
    label: mapGameStatusToLabel(GameStatus.Retired),
    icon: (color, size = 20) => <XCircle size={size} color={color} />,
    color: "#EF4444",
    bgClassName: "bg-error-500/20",
  },
];

export const getGameStatusVisual = (status: GameStatus) =>
  GAME_STATUS_VISUALS.find((visual) => visual.status === status) ??
  GAME_STATUS_VISUALS[0];
