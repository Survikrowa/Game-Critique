import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import { FlatList, View } from "react-native";

import { haptic } from "@/modules/haptics/haptic";
import { useNotificationHistoryStore } from "@/modules/notifications/notification_history_store";
import { timeToRelative } from "@/modules/strings/time_to_relative";
import { EmptyState } from "@/ui/feedback/empty_state/empty_state";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

export const NotificationsScreen = () => {
  const notifications = useNotificationHistoryStore((s) => s.notifications);
  const markAsRead = useNotificationHistoryStore((s) => s.markAsRead);

  const handlePress = (notification: (typeof notifications)[number]) => {
    haptic.light();
    markAsRead(notification.id);
    const { data } = notification;
    switch (data.type) {
      case "game":
        router.push({
          pathname: "/friends/games_status_info/[games_status_id]",
          params: {
            games_status_id: data.gamesStatusId,
            oauth_id: data.oauthId,
          },
        });
        break;
      case "friend_request":
        router.push("/friends/friends_requests");
        break;
      case "friend_accepted":
        router.push("/friends/friends_list");
        break;
      case "stats":
        router.push("/user");
        break;
    }
  };

  if (notifications.length === 0) {
    return (
      <EmptyState
        title="Brak powiadomień"
        description="Nie masz jeszcze żadnych powiadomień"
        icon={<Bell size={32} color="#3B82F6" />}
      />
    );
  }

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          className="min-h-[44px] px-4 py-3"
          onPress={() => handlePress(item)}
        >
          <HStack className="items-start gap-3">
            {item.isRead ? (
              <View className="mt-2 w-2" />
            ) : (
              <View className="mt-2 h-2 w-2 rounded-full bg-primary-500" />
            )}
            <VStack className="flex-1 gap-1">
              <Text
                size="medium"
                weight={item.isRead ? "normal" : "bold"}
                color="primary"
              >
                {item.title}
              </Text>
              <Text size="small" weight="normal" color="secondary">
                {item.body}
              </Text>
              <Text size="small" weight="normal" color="secondary">
                {timeToRelative(item.receivedAt)}
              </Text>
            </VStack>
          </HStack>
        </Pressable>
      )}
      className="flex-1"
    />
  );
};
