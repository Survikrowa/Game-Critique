import { Bell } from "lucide-react-native";
import { Text as RNText, View } from "react-native";

import { Pressable } from "@/ui/forms/pressable/pressable";
import { Text } from "@/ui/typography/text";
import { useNotificationHistoryStore } from "@/modules/notifications/notification_history_store";

type NotificationBellProps = {
  onPress: () => void;
};

export const NotificationBell = ({ onPress }: NotificationBellProps) => {
  const unreadCount = useNotificationHistoryStore(
    (state) => state.notifications.filter((n) => !n.isRead).length,
  );

  return (
    <Pressable
      className="min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-background-100"
      onPress={onPress}
    >
      <Bell size={18} color="#64748B" />
      {unreadCount > 0 && (
        <View className="bg-red-500 absolute -right-1 -top-1 h-[18px] min-w-[18px] items-center justify-center rounded-full px-[3px]">
          <RNText
            className="font-bold text-typography-white"
            style={{ fontSize: 10 }}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </RNText>
        </View>
      )}
    </Pressable>
  );
};
