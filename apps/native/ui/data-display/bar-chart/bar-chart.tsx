import React, { useEffect } from "react";
import { ScrollView, Text as RNText } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

import { Box } from "@/ui/layout/box/box";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

interface BarChartDataItem {
  value: number;
  label: string;
  frontColor?: string;
  gradientColor?: string;
}

interface BarChartProps {
  data: BarChartDataItem[];
  barWidth?: number;
  height?: number;
  width?: number;
  horizontal?: boolean;
  showValuesAsTopLabel?: boolean;
  showScrollIndicator?: boolean;
  labelsExtraHeight?: number;
  labelWidth?: number;
  topLabelContainerStyle?: any;
  topLabelTextStyle?: any;
  noOfSections?: number;
  yAxisTextStyle?: any;
  isAnimated?: boolean;
  animationDuration?: number;
  yAxisThickness?: number;
  xAxisThickness?: number;
  xAxisLabelTextStyle?: any;
  showGradient?: boolean;
  renderTooltip?: (item: BarChartDataItem) => React.ReactNode;
}

const AnimatedBar = ({
  value,
  maxValue,
  color = "#4A90E2",
  animationDuration = 300,
  delay = 0,
  height,
}: {
  value: number;
  maxValue: number;
  color: string;
  animationDuration: number;
  delay: number;
  height: number;
}) => {
  const widthValue = useSharedValue(0);

  useEffect(() => {
    widthValue.value = withDelay(
      delay,
      withTiming((value / maxValue) * 100, { duration: animationDuration }),
    );
  }, [value, maxValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${widthValue.value}%`,
    };
  });

  return (
    <Box className="flex-1 bg-background-800/20 rounded" style={{ height }}>
      <Animated.View
        className="h-full rounded"
        style={[
          animatedStyle,
          {
            backgroundColor: color,
          },
        ]}
      />
    </Box>
  );
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  barWidth = 18,
  height = 200,
  width = 240,
  horizontal = false,
  showValuesAsTopLabel = false,
  animationDuration = 300,
  renderTooltip,
}) => {
  if (!data || data.length === 0) {
    return (
      <Box className="items-center justify-center" style={{ height, width }}>
        <RNText style={{ color: "white", fontSize: 14 }}>
          No data available
        </RNText>
      </Box>
    );
  }

  const maxValue = Math.max(...data.map((item) => item.value));

  if (!horizontal) {
    return (
      <Box className="items-center justify-center" style={{ height, width }}>
        <RNText style={{ color: "white", fontSize: 14 }}>
          Vertical charts not supported yet
        </RNText>
      </Box>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      style={{ height }}
      contentContainerStyle={{ paddingVertical: 10 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack className="gap-3 px-2">
        {data.map((item, index) => (
          <HStack key={index} className="items-center gap-2">
            {/* Label */}
            <Box className="w-[100px]">
              <RNText
                style={{
                  color: "white",
                  fontSize: 12,
                  textAlign: "right",
                }}
                numberOfLines={2}
              >
                {item.label}
              </RNText>
            </Box>

            {/* Bar Container */}
            <Box
              className="flex-1 flex-row items-center"
              style={{ width: width - 140 }}
            >
              <Box className="flex-1">
                <AnimatedBar
                  value={item.value}
                  maxValue={maxValue}
                  height={barWidth}
                  color={item.frontColor || "#4A90E2"}
                  animationDuration={animationDuration}
                  delay={index * 50}
                />
              </Box>

              {/* Value label */}
              {showValuesAsTopLabel && (
                <RNText
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontWeight: "bold",
                    marginLeft: 8,
                  }}
                >
                  {item.value}
                </RNText>
              )}
            </Box>

            {/* Tooltip */}
            {renderTooltip && <Box className="ml-2">{renderTooltip(item)}</Box>}
          </HStack>
        ))}
      </VStack>
    </ScrollView>
  );
};
