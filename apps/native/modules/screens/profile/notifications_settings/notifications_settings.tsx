import { ArrowLeft } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNotificationPreferences } from "@/modules/notifications/use_notification_preferences/use_notification_preferences";
import { haptic } from "@/modules/haptics/haptic";
import { Pressable as UIPressable } from "@/ui/forms/pressable/pressable";
import { Text } from "@/ui/typography/text";
import { VStack } from "@/ui/layout/vstack/vstack";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { ErrorState } from "@/ui/feedback/error_state/error_state";
import { router } from "expo-router";

type ToggleConfig = {
  key:
    | "friendActivity"
    | "friendInvites"
    | "weeklySummary"
    | "releaseReminders";
  label: string;
  description: string;
};

const TOGGLE_CONFIGS: ToggleConfig[] = [
  {
    key: "friendActivity",
    label: "Aktywność znajomych",
    description: "Gdy znajomy ukończy grę, oceni lub napisze recenzję",
  },
  {
    key: "friendInvites",
    label: "Zaproszenia do znajomych",
    description: "Gdy ktoś chce Cię dodać do znajomych",
  },
  {
    key: "weeklySummary",
    label: "Tygodniowe podsumowanie",
    description: "Co poniedziałek — podsumowanie Twojego tygodnia",
  },
  {
    key: "releaseReminders",
    label: "Premiere gier",
    description: "Przypomnienia o nadchodzących premierach",
  },
];

export const NotificationsSettings = () => {
  const { preferences, loading, error, update } = useNotificationPreferences();

  const handleToggle = async (
    key: ToggleConfig["key"],
    value: boolean,
  ): Promise<void> => {
    haptic.medium();
    await update({ [key]: value });
  };

  if (loading) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-background-0">
        <VStack className="px-4 py-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              style={{ width: "100%", height: 60, borderRadius: 8 }}
            />
          ))}
        </VStack>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-background-0">
        <ErrorState
          title="Błąd"
          description="Nie udało się załadować ustawień"
          onRetry={() => {}}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background-0">
      <VStack className="px-4 py-4 gap-4">
        <HStack className="items-center gap-4 mb-2">
          <Pressable
            onPress={() => router.back()}
            className="min-h-[44px] min-w-[44px] items-center justify-center"
          >
            <ArrowLeft size={24} color="#64748B" />
          </Pressable>
          <Text size="xl" weight="bold" color="primary">
            Powiadomienia
          </Text>
        </HStack>
        {TOGGLE_CONFIGS.map(({ key, label, description }) => (
          <VStack key={key} className="gap-1">
            <HStack className="items-center justify-between">
              <Text color="primary">{label}</Text>
              <ToggleSwitch
                value={preferences?.[key] ?? true}
                onToggle={(val) => handleToggle(key, val)}
              />
            </HStack>
            <Text size="sm" color="secondary">
              {description}
            </Text>
            <View className="h-px bg-background-100 mt-2" />
          </VStack>
        ))}
      </VStack>
    </SafeAreaView>
  );
};

const ToggleSwitch = ({
  value,
  onToggle,
}: {
  value: boolean;
  onToggle: (val: boolean) => void;
}) => (
  <UIPressable
    onPress={() => onToggle(!value)}
    className={`min-h-[44px] min-w-[44px] items-center justify-center px-4 rounded-full ${
      value ? "bg-primary-500" : "bg-background-100"
    }`}
  >
    <Text>{value ? "ON" : "OFF"}</Text>
  </UIPressable>
);
