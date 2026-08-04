import { router } from "expo-router";
import { ExternalLink, Trash2 } from "lucide-react-native";
import { FlatList, Image, Pressable, View } from "react-native";

import { formatReleaseDateToPolishLocale } from "@/modules/dates/date_to_polish_locale";
import { useReminderAction } from "@/modules/release_reminders/use_reminder_action/use_reminder_action";
import { useUserReminders } from "@/modules/release_reminders/use_user_reminders/use_user_reminders";
import { EmptyState } from "@/ui/feedback/empty_state/empty_state";
import { ErrorState } from "@/ui/feedback/error_state/error_state";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { Text } from "@/ui/typography/text";

export const RemindersScreen = () => {
  const { data, loading, error, refetch } = useUserReminders();
  const { removeReminder } = useReminderAction();
  const reminders = data?.getUserReminders;

  const handleDelete = async (igdbId: number) => {
    await removeReminder(igdbId);
    refetch();
  };

  const handleOpenLink = (url: string) => {
    router.push({ pathname: "/webview", params: { url } });
  };

  if (loading) {
    return (
      <View className="flex-1 gap-4 px-4 py-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[80px] rounded-xl" />
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Nie udało się załadować"
        description="Spróbuj ponownie później"
        onRetry={refetch}
      />
    );
  }

  if (!reminders || reminders.length === 0) {
    return (
      <EmptyState
        title="Brak obserwowanych"
        description="Dodaj premiery z zakładki Nadchodzące gry"
      />
    );
  }

  return (
    <FlatList
      data={reminders}
      contentContainerClassName="px-4 py-4 gap-3"
      renderItem={({ item }) => (
        <View className="flex-row items-center gap-3 rounded-xl bg-background-50 p-3">
          {item.coverUrl ? (
            <Image
              source={{ uri: item.coverUrl }}
              className="h-[60px] w-[40px] rounded-lg"
              resizeMode="cover"
            />
          ) : (
            <View className="h-[60px] w-[40px] rounded-lg bg-background-100" />
          )}
          <View className="flex-1 gap-1">
            <Text size="medium" weight="semiBold" color="primary">
              {item.gameName}
            </Text>
            <Text size="small" weight="normal" color="secondary">
              {formatReleaseDateToPolishLocale(item.releaseDate)}
            </Text>
          </View>
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => handleOpenLink(item.gameUrl)}
              className="min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-background-0 p-2"
            >
              <ExternalLink size={18} color="#3B82F6" />
            </Pressable>
            <Pressable
              onPress={() => handleDelete(item.igdbId)}
              className="min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-background-0 p-2"
            >
              <Trash2 size={18} color="#EF4444" />
            </Pressable>
          </View>
        </View>
      )}
    />
  );
};
