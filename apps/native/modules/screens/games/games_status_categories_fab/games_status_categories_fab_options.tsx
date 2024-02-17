import { PlusCircle } from "@tamagui/lucide-icons";
import { IActionProps } from "react-native-floating-action";

export const ACTION_NAMES = {
  ADD_GAME: "add_game",
};
export const GAMES_STATUS_CATEGORIES_FAB_OPTIONS: IActionProps[] = [
  {
    name: ACTION_NAMES.ADD_GAME,
    text: "Dodaj nową grę",
    icon: <PlusCircle size="$2" color="white" />,
  },
];
