import { tva } from "@gluestack-ui/utils/nativewind-utils";
import React from "react";
import { Pressable, PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const fabStyle = tva({
  base: "bg-primary-500 rounded-full z-20 p-4 flex-row items-center justify-center absolute shadow-hard-2",
  variants: {
    size: {
      sm: "px-2.5 py-2.5",
      md: "px-3 py-3",
      lg: "px-4 py-4",
    },
    placement: {
      "top right": "top-4 right-4",
      "top left": "top-4 left-4",
      "bottom right": "bottom-4 right-4",
      "bottom left": "bottom-4 left-4",
      "top center": "top-4 self-center",
      "bottom center": "bottom-4 self-center",
    },
  },
  defaultVariants: {
    size: "md",
    placement: "bottom right",
  },
});

const fabLabelStyle = tva({
  base: "text-typography-50 font-normal font-body tracking-md text-left mx-2",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
});

const fabIconStyle = tva({
  base: "text-typography-50 fill-none",
  variants: {
    size: {
      "2xs": "h-3 w-3",
      xs: "h-3.5 w-3.5",
      sm: "h-4 w-4",
      md: "w-[18px] h-[18px]",
      lg: "h-5 w-5",
      xl: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface FabProps extends Omit<PressableProps, "children"> {
  size?: "sm" | "md" | "lg";
  placement?:
    | "top right"
    | "top left"
    | "bottom right"
    | "bottom left"
    | "top center"
    | "bottom center";
  isDisabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Fab = ({
  size = "md",
  placement = "bottom right",
  isDisabled = false,
  className,
  children,
  onPress,
  ...props
}: FabProps) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 400 });
  };

  React.useEffect(() => {
    opacity.value = withTiming(isDisabled ? 0.4 : 1, { duration: 150 });
  }, [isDisabled]);

  return (
    <AnimatedPressable
      className={fabStyle({ size, placement, class: className })}
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
};

interface FabLabelProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export const FabLabel = ({ size, className, children }: FabLabelProps) => {
  return (
    <Animated.Text className={fabLabelStyle({ size, class: className })}>
      {children}
    </Animated.Text>
  );
};

interface FabIconProps {
  as: React.ComponentType<any>;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: string;
}

export const FabIcon = ({
  as: IconComponent,
  size = "md",
  className,
  color = "#fff",
  ...props
}: FabIconProps) => {
  const iconClassName = fabIconStyle({ size, class: className });

  return <IconComponent className={iconClassName} color={color} {...props} />;
};
