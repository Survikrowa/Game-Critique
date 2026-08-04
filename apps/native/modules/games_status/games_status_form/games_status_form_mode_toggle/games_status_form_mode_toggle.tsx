import { Pressable } from "react-native";

import { HStack } from "@/ui/layout/hstack/hstack";
import { Text } from "@/ui/typography/text";

type GamesStatusFormModeToggleProps = {
  isQuickMode: boolean;
  onChange: (isQuickMode: boolean) => void;
};

export const GamesStatusFormModeToggle = ({
  isQuickMode,
  onChange,
}: GamesStatusFormModeToggleProps) => {
  return (
    <HStack className="gap-2 p-1 rounded-xl bg-background-100">
      <Pressable
        onPress={() => onChange(true)}
        className={`flex-1 py-2 rounded-lg items-center min-h-[44px] justify-center ${
          isQuickMode ? "bg-primary-500" : "bg-transparent"
        }`}
      >
        <Text
          size="small"
          weight="bold"
          color={isQuickMode ? "white" : "secondary"}
        >
          Szybkie dodawanie
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onChange(false)}
        className={`flex-1 py-2 rounded-lg items-center min-h-[44px] justify-center ${
          !isQuickMode ? "bg-primary-500" : "bg-transparent"
        }`}
      >
        <Text
          size="small"
          weight="bold"
          color={!isQuickMode ? "white" : "secondary"}
        >
          Pełny formularz
        </Text>
      </Pressable>
    </HStack>
  );
};
