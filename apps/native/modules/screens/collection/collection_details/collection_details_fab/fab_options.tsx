import { PlusCircle } from "@tamagui/lucide-icons";
import { IActionProps } from "react-native-floating-action";

export const ACTION_NAMES = {
  ADD_GAME: "add_game",
};

export const FabOptions: IActionProps[] = [
  {
    name: ACTION_NAMES.ADD_GAME,
    text: "Dodaj grę do kolekcji",
    icon: <PlusCircle size="$2" color="white" />,
  },
];
