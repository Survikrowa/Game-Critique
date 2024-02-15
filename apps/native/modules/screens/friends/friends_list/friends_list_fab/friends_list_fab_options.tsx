import { Bell, Search } from "@tamagui/lucide-icons";
import { IActionProps } from "react-native-floating-action";

export const ACTION_NAMES = {
  FRIENDS_SEARCH: "friends_search",
  FRIENDS_REQUESTS: "friends_requests",
};

export const FabOptions: IActionProps[] = [
  {
    name: ACTION_NAMES.FRIENDS_REQUESTS,
    text: "Zaproszenia do znajomych",
    icon: <Bell size="$2" color="white" />,
  },
  {
    name: ACTION_NAMES.FRIENDS_SEARCH,
    text: "Dodaj znajomych",
    icon: <Search size="$2" color="white" />,
  },
];
