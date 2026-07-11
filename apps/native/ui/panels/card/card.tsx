import { tva } from "@gluestack-ui/utils/nativewind-utils";
import { ReactNode } from "react";
import { View } from "react-native";

type CardVariant = "default" | "surface" | "bordered";

type CardProps = {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
};

const cardStyle = tva({
  base: "rounded-xl p-4 gap-2",
  variants: {
    variant: {
      default: "bg-background-50",
      surface: "bg-background-100",
      bordered: "bg-background-50 border border-outline-0",
    },
  },
});

export const Card = ({
  children,
  variant = "default",
  className,
}: CardProps) => {
  return (
    <View className={cardStyle({ variant, class: className })}>{children}</View>
  );
};
