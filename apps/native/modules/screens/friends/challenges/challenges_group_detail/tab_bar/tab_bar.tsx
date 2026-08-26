import { TabButton } from "../tab_button/tab_button";

import { HStack } from "@/ui/layout/hstack/hstack";

export type ChallengeGroupTab = "challenges" | "leaderboard";

type TabBarProps = {
  tab: ChallengeGroupTab;
  onChange: (tab: ChallengeGroupTab) => void;
};

export const TabBar = ({ tab, onChange }: TabBarProps) => (
  <HStack className="justify-center gap-8 py-2">
    <TabButton
      label="Wyzwania"
      active={tab === "challenges"}
      onPress={() => onChange("challenges")}
    />
    <TabButton
      label="Leaderboard"
      active={tab === "leaderboard"}
      onPress={() => onChange("leaderboard")}
    />
  </HStack>
);
