import { router } from "expo-router";
import { Edit3 } from "lucide-react-native";

import { haptic } from "@/modules/haptics/haptic";
import { ButtonWithIcon } from "@/ui/forms/button_icon";

type GamesStatusListItemButtonEditProps = {
  gameStatusId: number;
  onClick: () => void;
};

export const GamesStatusListItemButtonEdit = ({
  gameStatusId,
  onClick,
}: GamesStatusListItemButtonEditProps) => {
  return (
    <ButtonWithIcon
      action="positive"
      className="min-h-[44px] w-full"
      onPress={() => {
        haptic.medium();
        router.push({
          pathname: "/games/games_status_edit_form/[game_status_id]",
          params: { game_status_id: gameStatusId },
        });
        onClick();
      }}
      icon={<Edit3 size={16} color="#fff" />}
    >
      Edytuj
    </ButtonWithIcon>
  );
};
