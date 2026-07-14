import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

type AchievementCenterGlowProps = {
  color: string;
  width?: number;
  height?: number;
};

/**
 * Soft radial glow washing over the card's cover image, breathing in and out
 * so the whole card looks "alive" — pairs with AchievementGlowBorder.
 */
export const AchievementCenterGlow = ({
  color,
  width = 112,
  height = 142,
}: AchievementCenterGlowProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    fillOpacity: 0.12 + progress.value * 0.33,
  }));

  const gradientId = `achievement-center-glow-${color.replace("#", "")}`;

  return (
    <Svg
      pointerEvents="none"
      style={{ position: "absolute", top: 0, left: 0 }}
      width={width}
      height={height}
    >
      <Defs>
        <RadialGradient id={gradientId} cx="50%" cy="40%" r="65%">
          <Stop offset="0%" stopColor={color} stopOpacity={1} />
          <Stop offset="100%" stopColor={color} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <AnimatedRect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={`url(#${gradientId})`}
        animatedProps={animatedProps}
      />
    </Svg>
  );
};
