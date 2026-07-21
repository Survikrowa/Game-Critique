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
  return (
    <ButtonWithIcon
      action="secondary"
      className="min-h-[44px] w-full"
      onPress={() => {
        haptic.light();
        onClick();
        router.push({
          pathname: "/friends/games_status_info/[games_status_id]",
          params: { games_status_id: gameStatusId, oauth_id: oauthId },
        });
      }}
      icon={<Eye size={16} color="#fff" />}
    >
      Przejdź do szczegółów
    </ButtonWithIcon>
  );
};
