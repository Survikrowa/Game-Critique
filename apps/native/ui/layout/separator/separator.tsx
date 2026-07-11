import { View } from "react-native";
import { tva } from "@gluestack-ui/utils/nativewind-utils";

const separatorVariants = tva({
  base: "bg-outline-0",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px self-stretch",
    },
    spacing: {
      none: "",
      xs: "",
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", spacing: "xs", class: "my-2" },
    { orientation: "horizontal", spacing: "sm", class: "my-3" },
    { orientation: "horizontal", spacing: "md", class: "my-4" },
    { orientation: "horizontal", spacing: "lg", class: "my-6" },
    { orientation: "vertical", spacing: "xs", class: "mx-2" },
    { orientation: "vertical", spacing: "sm", class: "mx-3" },
    { orientation: "vertical", spacing: "md", class: "mx-4" },
    { orientation: "vertical", spacing: "lg", class: "mx-6" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    spacing: "none",
  },
});

type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  spacing?: "none" | "xs" | "sm" | "md" | "lg";
};

export const Separator = ({
  orientation = "horizontal",
  spacing = "none",
}: SeparatorProps) => {
  return <View className={separatorVariants({ orientation, spacing })} />;
};
