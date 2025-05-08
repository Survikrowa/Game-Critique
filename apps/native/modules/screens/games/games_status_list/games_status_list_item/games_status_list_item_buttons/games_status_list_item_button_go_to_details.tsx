import { Eye } from "@tamagui/lucide-icons";
import { router } from "expo-router";

import { ButtonWithIcon } from "../../../../../../ui/forms/button_icon";

type GamesStatusListItemButtonGoToDetailsProps = {
  gameStatusId: number;
  oauthId?: string;
  onClick: () => void;
};

export const GamesStatusListItemButtonGoToDetails = ({
  gameStatusId,
  oauthId,
  onClick,
}: GamesStatusListItemButtonGoToDetailsProps) => {
  const targetUrl = `${
    oauthId ? "friends" : "games"
  }/games_status_info/${gameStatusId}?oauth_id=${oauthId}`;
  return (
    <ButtonWithIcon
      onPress={() => {
        onClick();
        router.push(targetUrl);
      }}
      icon={<Eye />}
      backgroundColor="$red1"
      width="100%"
    >
      Przejdź do szczegółów
    </ButtonWithIcon>
  );
};
