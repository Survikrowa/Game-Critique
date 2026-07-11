import { PlusCircle } from "lucide-react-native";
import { IActionProps } from "react-native-floating-action";

export const ACTION_NAMES = {
  ADD_GAME: "add_game",
};
export const GAMES_STATUS_CATEGORIES_FAB_OPTIONS: IActionProps[] = [
  {
    name: ACTION_NAMES.ADD_GAME,
    text: "Dodaj nową grę",
    icon: <PlusCircle size={20} color="white" />,
  },
];
