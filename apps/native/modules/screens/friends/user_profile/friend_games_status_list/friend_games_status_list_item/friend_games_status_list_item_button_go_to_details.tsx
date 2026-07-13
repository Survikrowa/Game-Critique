import { router } from "expo-router";
import { Eye } from "lucide-react-native";

import { haptic } from "@/modules/haptics/haptic";
import { ButtonWithIcon } from "@/ui/forms/button_icon";

type FriendGamesStatusListItemButtonGoToDetailsProps = {
  gameStatusId: number;
  oauthId: string;
  onClick: () => void;
};

export const FriendGamesStatusListItemButtonGoToDetails = ({
  gameStatusId,
  oauthId,
  onClick,
}: FriendGamesStatusListItemButtonGoToDetailsProps) => {
  const targetUrl = `friends/games_status_info/${gameStatusId}?oauth_id=${oauthId}`;
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
