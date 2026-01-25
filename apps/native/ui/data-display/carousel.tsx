import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";

import { Box } from "../layout/box/box";

type CarouselRenderItemInfo<T> = {
  item: T;
  index: number;
};

type CarouselProps<T> = {
  data: T[];
  renderItem: (info: CarouselRenderItemInfo<T>) => React.ReactElement;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
};

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 3;
const ITEM_SPACING = 16;

export const Carousel = <T,>({
  data,
  renderItem,
  autoPlay = true,
  autoPlayInterval = 3000,
  loop = true,
}: CarouselProps<T>) => {
  const scrollViewRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToNext = () => {
    if (!data || data.length === 0) return;

    const nextIndex = currentIndex + 1;

    if (nextIndex >= data.length) {
      if (loop) {
        scrollViewRef.current?.scrollTo({
          x: 0,
          animated: true,
        });
        setCurrentIndex(0);
      }
    } else {
      scrollViewRef.current?.scrollTo({
        x: (ITEM_WIDTH + ITEM_SPACING) * nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (autoPlay && data && data.length > 0) {
      autoPlayTimerRef.current = setInterval(() => {
        scrollToNext();
      }, autoPlayInterval);

      return () => {
        if (autoPlayTimerRef.current) {
          clearInterval(autoPlayTimerRef.current);
        }
      };
    }
  }, [autoPlay, autoPlayInterval, currentIndex, data?.length]);

  // Handle scroll position to update current index
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (ITEM_WIDTH + ITEM_SPACING));
    if (index !== currentIndex && index >= 0 && index < data.length) {
      setCurrentIndex(index);
    }
  };

  // Handle manual scroll - reset timer
  const onScrollBeginDrag = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  };

  const onScrollEndDrag = () => {
    if (autoPlay) {
      autoPlayTimerRef.current = setInterval(() => {
        scrollToNext();
      }, autoPlayInterval);
    }
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Box className="w-full">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        contentContainerStyle={{
          paddingRight: 16,
          gap: 16,
        }}
      >
        {data.map((item, index) => (
          <Box key={`carousel-item-${index}`} style={{ width: ITEM_WIDTH }}>
            {renderItem({ item, index })}
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
};
