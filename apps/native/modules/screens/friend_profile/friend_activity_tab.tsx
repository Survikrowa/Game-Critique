import { FlatList, View } from "react-native";

import { EmptyState } from "@/ui/feedback/empty_state/empty_state";
import { Text } from "@/ui/typography/text";

type ActivityEntry = {
  id: number;
  activityType: string;
  game?: {
    id: number;
    name: string;
  } | null;
  formattedUpdatedAt: string;
};

type FriendActivityTabProps = {
  activities?: ActivityEntry[] | null;
};

export const FriendActivityTab = ({ activities }: FriendActivityTabProps) => {
  if (!activities || activities.length === 0) {
    return (
      <EmptyState
        title="Brak aktywności"
        description="Ten użytkownik nie ma jeszcze żadnej aktywności"
      />
    );
  }

  return (
    <FlatList
      data={activities}
      keyExtractor={(item) => String(item.id)}
      contentContainerClassName="gap-2 px-4 pb-4"
      renderItem={({ item }) => (
        <View className="rounded-2xl bg-background-50 p-4">
          <Text size="medium" weight="semiBold" color="primary">
            {item.activityType === "GAME_STATUS_CHANGED"
              ? "Zmienił status gry"
              : item.activityType}
          </Text>
          {item.game && (
            <Text size="small" weight="normal" color="secondary">
              {item.game.name}
            </Text>
          )}
          <View>
            <Text size="small" weight="normal" color="tertiary">
              {item.formattedUpdatedAt}
            </Text>
          </View>
        </View>
      )}
    />
  );
};
