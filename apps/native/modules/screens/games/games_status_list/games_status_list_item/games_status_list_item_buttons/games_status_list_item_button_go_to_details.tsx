import { Eye } from "lucide-react-native";
import { router } from "expo-router";

import { ButtonWithIcon } from "../../../../../../ui/forms/button_icon";
import { haptic } from "../../../../../../modules/haptics/haptic";

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
      action="secondary"
      className="w-full min-h-[44px]"
      onPress={() => {
        haptic.light();
        onClick();
        // @ts-ignore — pre-existing route type issue
        router.push(targetUrl);
      }}
      icon={<Eye size={16} color="#fff" />}
    >
      Przejdź do szczegółów
    </ButtonWithIcon>
  );
};
