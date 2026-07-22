import { RefreshCcw } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { UserAvatar } from "@/modules/user/user_avatar/user_avatar";
import { Text } from "@/ui/typography/text";

type FriendProfileHeaderProps = {
  name?: string | null;
  avatarUrl?: string | null;
  gamesCount?: number;
  achievementsCount?: number;
  lastActivity?: string | null;
  onRefreshClick: () => void;
};

export const FriendProfileHeader = ({
  name,
  avatarUrl,
  gamesCount,
  achievementsCount,
  lastActivity,
  onRefreshClick,
}: FriendProfileHeaderProps) => {
  return (
    <View className="px-4 pt-4">
      <View className="flex-row items-center gap-4">
        <UserAvatar avatarUrl={avatarUrl || ""} size="$9" />
        <View className="flex-1">
          <Text size="large" weight="bold" color="primary">
            {name || "Nieznany"}
          </Text>
          {lastActivity && (
            <Text size="small" weight="normal" color="secondary">
              Ostatnia aktywność: {lastActivity}
            </Text>
          )}
        </View>
        <Pressable
          onPress={onRefreshClick}
          className="min-h-[44px] min-w-[44px] items-center justify-center"
        >
          <RefreshCcw size={20} color="#3B82F6" />
        </Pressable>
      </View>
      <View className="mt-4 flex-row gap-3">
        <View className="flex-1 items-center rounded-2xl bg-background-50 p-3">
          <Text size="extraLarge" weight="bold" color="primary">
            {gamesCount ?? "—"}
          </Text>
          <Text size="small" weight="normal" color="secondary">
            Gier
          </Text>
        </View>
        <View className="flex-1 items-center rounded-2xl bg-background-50 p-3">
          <Text size="extraLarge" weight="bold" color="primary">
            {achievementsCount ?? "—"}
          </Text>
          <Text size="small" weight="normal" color="secondary">
            Platyn
          </Text>
        </View>
      </View>
    </View>
  );
};
