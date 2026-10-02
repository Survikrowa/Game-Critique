import { Pressable } from "@/ui/forms/pressable/pressable";
import { Text } from "@/ui/typography/text";

type TabButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export const TabButton = ({ label, active, onPress }: TabButtonProps) => (
  <Pressable
    className={`min-h-[44px] justify-center ${
      active ? "border-b-2 border-primary-500" : ""
    }`}
    onPress={onPress}
  >
    <Text
      size="medium"
      color={active ? "active" : "secondary"}
      weight="semiBold"
    >
      {label}
    </Text>
  </Pressable>
);
