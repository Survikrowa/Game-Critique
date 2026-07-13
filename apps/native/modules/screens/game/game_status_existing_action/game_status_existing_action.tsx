import { useRouter } from "expo-router";
import { LibraryBig } from "lucide-react-native";

import { GameStatus } from "../../../../__generated__/types";
import { haptic } from "../../../haptics/haptic";
import { useGameStatusStore } from "../../games/games_status_store/use_games_status_store";

import { ButtonWithIcon } from "@/ui/forms/button_icon";

type GameStatusExistingActionProps = {
  status: GameStatus;
};

export const GameStatusExistingAction = ({
  status,
}: GameStatusExistingActionProps) => {
  const router = useRouter();
  const updateFilters = useGameStatusStore((state) => state.updateFilters);

  const handlePress = () => {
    haptic.light();
    updateFilters({ status });
    router.push("/games/games");
  };

  return (
    <ButtonWithIcon
      action="secondary"
      className="min-h-[44px]"
      icon={<LibraryBig size={18} color="#fff" />}
      onPress={handlePress}
    >
      Zobacz w bibliotece
    </ButtonWithIcon>
  );
};
