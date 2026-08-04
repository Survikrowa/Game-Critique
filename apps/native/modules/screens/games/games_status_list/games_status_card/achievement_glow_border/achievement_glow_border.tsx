import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Rect } from "react-native-svg";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

type AchievementGlowBorderProps = {
  color: string;
  width?: number;
  height?: number;
  radius?: number;
  strokeWidth?: number;
};

const EXPAND = 7;

/**
 * Border that pulses outward (radar-ping style) instead of travelling
 * around the card — a static dim ring plus an expanding, fading ring
 * looping continuously.
 */
export const AchievementGlowBorder = ({
  color,
  width = 112,
  height = 142,
  radius = 12,
  strokeWidth = 2,
}: AchievementGlowBorderProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.out(Easing.quad) }),
      -1,
      false,
    );
  }, []);

  const baseProps = {
    x: strokeWidth / 2,
    y: strokeWidth / 2,
    width: width - strokeWidth,
    height: height - strokeWidth,
    rx: radius,
  };

  const pingAnimatedProps = useAnimatedProps(() => {
    const grow = progress.value * EXPAND;
    return {
      x: strokeWidth / 2 - grow,
      y: strokeWidth / 2 - grow,
      width: width - strokeWidth + grow * 2,
      height: height - strokeWidth + grow * 2,
      rx: radius + grow,
      strokeOpacity: 0.7 * (1 - progress.value),
    };
  });

  return (
    <Svg
      pointerEvents="none"
      style={{
        position: "absolute",
        top: -EXPAND,
        left: -EXPAND,
      }}
      width={width + EXPAND * 2}
      height={height + EXPAND * 2}
      viewBox={`${-EXPAND} ${-EXPAND} ${width + EXPAND * 2} ${
        height + EXPAND * 2
      }`}
    >
      <Rect
        {...baseProps}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeOpacity={0.55}
        fill="none"
      />
      <AnimatedRect
        stroke={color}
        strokeWidth={strokeWidth}
        animatedProps={pingAnimatedProps}
        fill="none"
      />
    </Svg>
  );
};
