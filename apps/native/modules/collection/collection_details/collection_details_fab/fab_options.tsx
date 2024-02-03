import { PlusCircle } from "@tamagui/lucide-icons";
import { IActionProps } from "react-native-floating-action";

export const FabOptions: IActionProps[] = [
  {
    name: "add_game",
    text: "Dodaj grę do kolekcji",
    icon: <PlusCircle size="$2" color="white" />,
  },
];
