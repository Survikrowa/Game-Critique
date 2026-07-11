import { Edit3 } from "lucide-react-native";
import { router } from "expo-router";

import { ButtonWithIcon } from "../../../../../../ui/forms/button_icon";
import { haptic } from "../../../../../../modules/haptics/haptic";

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
      className="w-full min-h-[44px]"
      onPress={() => {
        haptic.medium();
        // @ts-ignore — pre-existing route type issue
        router.push(`/games/games_status_edit_form/${gameStatusId}`);
        onClick();
      }}
      icon={<Edit3 size={16} color="#fff" />}
    >
      Edytuj
    </ButtonWithIcon>
  );
};
