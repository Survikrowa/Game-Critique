import { tva } from "@gluestack-ui/utils/nativewind-utils";
import React, { useEffect } from "react";
import { View, ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const skeletonStyle = tva({
  base: "bg-background-200 overflow-hidden",
  variants: {
    variant: {
      rounded: "rounded-md",
      sharp: "rounded-none",
      circular: "rounded-full",
    },
    speed: {
      1: "duration-75",
      2: "duration-100",
      3: "duration-150",
      4: "duration-200",
    },
  },
  defaultVariants: {
    variant: "rounded",
    speed: 2,
  },
});

interface SkeletonProps extends ViewProps {
  variant?: "rounded" | "sharp" | "circular";
  startColor?: string;
  isLoaded?: boolean;
  speed?: 1 | 2 | 3 | 4;
  className?: string;
  children?: React.ReactNode;
}

export const Skeleton = ({
  variant = "rounded",
  startColor = "bg-background-200",
  isLoaded = false,
  speed = 2,
  className,
  children,
  ...props
}: SkeletonProps) => {
  const shimmerTranslate = useSharedValue(-1);

  const speedDurationMap = {
    1: 750,
    2: 1000,
    3: 1500,
    4: 2000,
  };

  useEffect(() => {
    if (!isLoaded) {
      shimmerTranslate.value = withRepeat(
        withTiming(1, { duration: speedDurationMap[speed] }),
        -1,
        false,
      );
    }
  }, [isLoaded, speed]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmerTranslate.value,
      [-1, 1],
      [-300, 300],
    );

    return {
      transform: [{ translateX }],
    };
  });

  if (isLoaded && children) {
    return <>{children}</>;
  }

  if (isLoaded) {
    return null;
  }

  return (
    <View
      className={skeletonStyle({ variant, speed, class: className })}
      {...props}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        ]}
      />
    </View>
  );
};

interface SkeletonTextProps extends ViewProps {
  _lines?: number;
  startColor?: string;
  isLoaded?: boolean;
  speed?: 1 | 2 | 3 | 4;
  gap?: 1 | 2 | 3 | 4;
  className?: string;
  children?: React.ReactNode;
}

const gapMap = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
};

export const SkeletonText = ({
  _lines = 3,
  startColor = "bg-background-200",
  isLoaded = false,
  speed = 2,
  gap = 2,
  className,
  children,
  ...props
}: SkeletonTextProps) => {
  if (isLoaded && children) {
    return <>{children}</>;
  }

  if (isLoaded) {
    return null;
  }

  return (
    <View style={{ gap: gapMap[gap] }} {...props}>
      {Array.from({ length: _lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          speed={speed}
          className={className}
          style={{
            width: index === _lines - 1 ? "70%" : "100%",
            height: 12,
          }}
        />
      ))}
    </View>
  );
};
