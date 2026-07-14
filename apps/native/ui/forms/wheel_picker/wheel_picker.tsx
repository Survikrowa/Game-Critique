import { useEffect, useMemo, useRef } from "react";
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  View,
} from "react-native";

import { Text } from "@/ui/typography/text";

type WheelPickerProps = {
  /** Numeric values shown top-to-bottom, e.g. [0,1,2,...,59]. */
  data: number[];
  value: number;
  onChange: (value: number) => void;
  /** Zero-padded label rendering, e.g. "05" instead of "5". */
  formatLabel?: (value: number) => string;
  itemHeight?: number;
  visibleItemCount?: number;
};

/**
 * Vertical scroll-wheel picker (iOS duration-picker style) built on ScrollView
 * with snap-to-item scrolling — no extra native dependency required. Uses
 * ScrollView instead of FlatList so it can be safely nested inside the
 * surrounding form's vertical ScrollView.
 */
export const WheelPicker = ({
  data,
  value,
  onChange,
  formatLabel = (v) => String(v),
  itemHeight = 40,
  visibleItemCount = 5,
}: WheelPickerProps) => {
  const listRef = useRef<ScrollView>(null);
  const paddingCount = Math.floor(visibleItemCount / 2);
  const containerHeight = itemHeight * visibleItemCount;

  const selectedIndex = useMemo(
    () => Math.max(data.indexOf(value), 0),
    [data, value],
  );

  useEffect(() => {
    listRef.current?.scrollTo({
      y: selectedIndex * itemHeight,
      animated: false,
    });
    // Only re-sync when the externally controlled value changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemHeight);
    const clampedIndex = Math.min(Math.max(index, 0), data.length - 1);
    const nextValue = data[clampedIndex];
    if (nextValue !== value) {
      onChange(nextValue);
    }
    listRef.current?.scrollTo({
      y: clampedIndex * itemHeight,
      animated: true,
    });
  };

  return (
    <View style={{ height: containerHeight }} className="w-full">
      <View
        pointerEvents="none"
        className="absolute left-0 right-0 border-y-2 border-primary-500 z-10"
        style={{ top: paddingCount * itemHeight, height: itemHeight }}
      />
      <ScrollView
        ref={listRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingVertical: paddingCount * itemHeight,
        }}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      >
        {data.map((item) => (
          <View
            key={item}
            style={{ height: itemHeight }}
            className="items-center justify-center"
          >
            <Text
              size="large"
              weight={item === value ? "bold" : "normal"}
              color={item === value ? "primary" : "secondary"}
            >
              {formatLabel(item)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
