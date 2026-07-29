import { Pressable, View } from "react-native";

import { Text } from "@/ui/typography/text";

type TabId = "games" | "stats" | "activity";

type Tab = {
  id: TabId;
  label: string;
};

const TABS: Tab[] = [
  { id: "games", label: "Gry" },
  { id: "stats", label: "Statystyki" },
  { id: "activity", label: "Aktywność" },
];

type FriendProfileTabsProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

export const FriendProfileTabs = ({
  activeTab,
  onTabChange,
}: FriendProfileTabsProps) => {
  return (
    <View className="flex-row gap-2 px-4">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            className={`flex min-h-[44px] items-center rounded-full px-4 py-4 text-center ${
              isActive ? "bg-primary-500" : "bg-background-100"
            }`}
          >
            <Text
              size="medium"
              weight={isActive ? "bold" : "normal"}
              color={isActive ? "white" : "primary"}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
