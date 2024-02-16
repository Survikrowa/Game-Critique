import { ReactNode } from "react";
import { Text as TamaguiText } from "tamagui";

type TextProps = {
  size: "small" | "medium" | "large" | "extraLarge";
  weight: "normal" | "semiBold" | "bold";
  color: keyof typeof TEXT_COLOR;
  children: ReactNode;
  transform?: "uppercase" | "lowercase" | "capitalize";
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
  primary: "black",
  secondary: "gray",
  tertiary: "$green8",
  active: "$blue8",
  warning: "$red10",
  white: "white",
  green: "$green10",
  blue: "$blue10",
  red: "$red10",
} as const;

export const Text = ({
  size,
  weight,
  children,
  color,
  transform,
}: TextProps) => {
  return (
    <TamaguiText
      fontSize={TEXT_SIZE[size]}
      fontWeight={TEXT_WEIGHT[weight]}
      color={TEXT_COLOR[color]}
      textTransform={transform}
      wordWrap="break-word"
    >
      {children}
    </TamaguiText>
  );
};
