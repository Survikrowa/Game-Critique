import { ReactNode } from "react";
import { View } from "react-native";
import { Text } from "ui/typography/text";

type GameChipProps = {
  label: string;
  icon?: ReactNode;
  variant?: "default" | "primary";
};

export const GameChip = ({
  label,
  icon,
  variant = "default",
}: GameChipProps) => (
  <View
    className={`flex-row items-center gap-1 rounded-full px-3 py-1 ${
      variant === "primary" ? "bg-primary-500/10" : "bg-background-100"
    }`}
  >
    {icon}
    <Text
      size="extraSmall"
      weight="semiBold"
      color={variant === "primary" ? "primary" : "secondary"}
    >
      {label}
    </Text>
  </View>
);
