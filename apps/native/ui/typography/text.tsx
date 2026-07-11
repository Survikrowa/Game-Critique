import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import React, { ReactNode } from "react";
import { Text as RNText, StyleSheet } from "react-native";

import { textStyle } from "./styles";

type TextProps = {
  size: "small" | "medium" | "large" | "extraLarge";
  weight: "normal" | "semiBold" | "bold";
  color: keyof typeof TEXT_COLOR_CLASS;
  children: ReactNode;
  transform?: "uppercase" | "lowercase" | "capitalize";
};

const TEXT_SIZE = {
  small: 12,
  medium: 14,
  large: 16,
  extraLarge: 22,
} as const;

const TEXT_WEIGHT: Record<TextProps["weight"], "normal" | "600" | "bold"> = {
  normal: "normal",
  semiBold: "600",
  bold: "bold",
};

/* Maps semantic color names to NativeWind / Tailwind classes */
const TEXT_COLOR_CLASS = {
  primary: "text-typography-100",
  secondary: "text-typography-400",
  tertiary: "text-success-400",
  active: "text-primary-500",
  warning: "text-error-500",
  white: "text-typography-white",
  green: "text-success-400",
  blue: "text-primary-500",
  red: "text-error-500",
} as const;

export const Text = ({
  size,
  weight,
  children,
  color,
  transform,
}: TextProps) => {
  return (
    <RNText
      className={TEXT_COLOR_CLASS[color]}
      style={StyleSheet.flatten([
        { fontSize: TEXT_SIZE[size], fontWeight: TEXT_WEIGHT[weight] },
        transform ? { textTransform: transform } : undefined,
      ])}
    >
      {children}
    </RNText>
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
