import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import React, { ReactNode } from "react";
import { Text as RNText } from "react-native";
import { Text as TamaguiText } from "tamagui";

import { textStyle } from "./styles";
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
  primary: "white",
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

type ITextProps = React.ComponentProps<typeof RNText> &
  VariantProps<typeof textStyle>;

export const GText = React.forwardRef<
  React.ComponentRef<typeof RNText>,
  ITextProps
>(function Text(
  {
    className,
    isTruncated,
    bold,
    underline,
    strikeThrough,
    size = "md",
    sub,
    italic,
    highlight,
    ...props
  },
  ref,
) {
  return (
    <RNText
      className={textStyle({
        isTruncated: isTruncated as boolean,
        bold: bold as boolean,
        underline: underline as boolean,
        strikeThrough: strikeThrough as boolean,
        size,
        sub: sub as boolean,
        italic: italic as boolean,
        highlight: highlight as boolean,
        class: className,
      })}
      {...props}
      ref={ref}
    />
  );
});

Text.displayName = "Text";
