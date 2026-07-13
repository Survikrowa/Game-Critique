import { useEffect, useMemo, useRef } from "react";
import { FlatList, View } from "react-native";

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
 * Vertical scroll-wheel picker (iOS duration-picker style) built on FlatList
 * with snap-to-item scrolling — no extra native dependency required.
 */
export const WheelPicker = ({
  data,
  value,
  onChange,
  formatLabel = (v) => String(v),
  itemHeight = 40,
  visibleItemCount = 5,
}: WheelPickerProps) => {
  const listRef = useRef<FlatList<number>>(null);
  const paddingCount = Math.floor(visibleItemCount / 2);
  const containerHeight = itemHeight * visibleItemCount;

  const selectedIndex = useMemo(
    () => Math.max(data.indexOf(value), 0),
    [data, value],
  );

  useEffect(() => {
    listRef.current?.scrollToOffset({
      offset: selectedIndex * itemHeight,
      animated: false,
    });
    // Only re-sync when the externally controlled value changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const handleMomentumScrollEnd = (offsetY: number) => {
    const index = Math.round(offsetY / itemHeight);
    const clampedIndex = Math.min(Math.max(index, 0), data.length - 1);
    const nextValue = data[clampedIndex];
    if (nextValue !== value) {
      onChange(nextValue);
    }
    listRef.current?.scrollToOffset({
      offset: clampedIndex * itemHeight,
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
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item) => String(item)}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        contentContainerStyle={{
          paddingVertical: paddingCount * itemHeight,
        }}
        onMomentumScrollEnd={(e) =>
          handleMomentumScrollEnd(e.nativeEvent.contentOffset.y)
        }
        renderItem={({ item }) => (
          <View
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
        )}
      />
    </View>
  );
};
