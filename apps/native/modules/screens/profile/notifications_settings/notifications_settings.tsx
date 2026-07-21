import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { haptic } from "@/modules/haptics/haptic";
import { useNotificationPreferences } from "@/modules/notifications/use_notification_preferences/use_notification_preferences";
import { ErrorState } from "@/ui/feedback/error_state/error_state";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { Pressable as UIPressable } from "@/ui/forms/pressable/pressable";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

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
        <VStack className="gap-4 px-4 py-4">
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
      <VStack className="gap-4 px-4 py-4">
        <HStack className="mb-2 items-center gap-4">
          <Pressable
            onPress={() => router.back()}
            className="min-h-[44px] min-w-[44px] items-center justify-center"
          >
            <ArrowLeft size={24} color="#64748B" />
          </Pressable>
          <Text size="large" weight="bold" color="primary">
            Powiadomienia
          </Text>
        </HStack>
        {TOGGLE_CONFIGS.map(({ key, label, description }) => (
          <VStack key={key} className="gap-1">
            <HStack className="items-center justify-between">
              <Text weight="normal" size="small" color="primary">
                {label}
              </Text>
              <ToggleSwitch
                value={preferences?.[key] ?? true}
                onToggle={(val) => handleToggle(key, val)}
              />
            </HStack>
            <Text weight="normal" size="small" color="secondary">
              {description}
            </Text>
            <View className="mt-2 h-px bg-background-100" />
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
    className={`min-h-[44px] min-w-[44px] items-center justify-center rounded-full px-4 ${
      value ? "bg-primary-500" : "bg-background-100"
    }`}
  >
    <Text color="primary" size="medium" weight="normal">
      {value ? "ON" : "OFF"}
    </Text>
  </UIPressable>
);
