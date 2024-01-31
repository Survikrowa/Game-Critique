import { ReactNode } from "react";
import { Text as TamaguiText } from "tamagui";

type TextProps = {
  size: "small" | "medium" | "large" | "extraLarge";
  weight: "normal" | "semiBold" | "bold";
  color: "primary" | "secondary" | "tertiary" | "active";
  children: ReactNode;
};

const TEXT_SIZE = {
  small: 12,
  medium: 14,
  large: 16,
  extraLarge: 22,
} as const;

const TEXT_WEIGHT = {
  normal: "normal",
  semiBold: "600",
  bold: "bold",
} as const;

const TEXT_COLOR = {
  primary: "$purple1",
  secondary: "$purple12",
  tertiary: "$green8",
  active: "$blue8",
} as const;

export const Text = ({ size, weight, children, color }: TextProps) => {
  return (
    <TamaguiText
      fontSize={TEXT_SIZE[size]}
      fontWeight={TEXT_WEIGHT[weight]}
      color={TEXT_COLOR[color]}
    >
      {children}
    </TamaguiText>
  );
};
