import { Edit } from "@tamagui/lucide-icons";
import { router } from "expo-router";

import { ButtonWithIcon } from "../../../../../../ui/forms/button_icon";

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
      onPress={() => {
        router.push(`/games/games_status_edit_form/${gameStatusId}`);
        onClick();
      }}
      icon={<Edit />}
      backgroundColor="$green8"
      width="100%"
    >
      Edytuj
    </ButtonWithIcon>
  );
};
