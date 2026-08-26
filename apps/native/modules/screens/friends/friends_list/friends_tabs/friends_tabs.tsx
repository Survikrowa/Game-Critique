import { TabButton } from "@/modules/screens/friends/challenges/challenges_group_detail/tab_button/tab_button";
import { HStack } from "@/ui/layout/hstack/hstack";

export type FriendsTab = "friends" | "challenges";

type FriendsTabsProps = {
  tab: FriendsTab;
  onChange: (tab: FriendsTab) => void;
};

export const FriendsTabs = ({ tab, onChange }: FriendsTabsProps) => (
  <HStack className="justify-center gap-8 px-4 pt-2">
    <TabButton
      label="Znajomi"
      active={tab === "friends"}
      onPress={() => onChange("friends")}
    />
    <TabButton
      label="Wyzwania"
      active={tab === "challenges"}
      onPress={() => onChange("challenges")}
    />
  </HStack>
);
