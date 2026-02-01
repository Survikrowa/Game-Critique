import { useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";

import { Box } from "../layout/box/box";

export type CarouselRenderItemInfo<T> = {
  item: T;
  index: number;
};

type CarouselProps<T> = {
  data: T[];
  renderItem: (info: CarouselRenderItemInfo<T>) => React.ReactElement;
  itemWidth: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  itemSpacing?: number;
};

const ITEM_SPACING = 16;

export const Carousel = <T,>({
  data,
  renderItem,
  itemWidth,
  autoPlay = true,
  autoPlayInterval = 3000,
  loop = true,
  itemSpacing = ITEM_SPACING,
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
        x: (itemWidth + itemSpacing) * nextIndex,
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
    const index = Math.round(scrollPosition / (itemWidth + itemSpacing));
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
        snapToInterval={itemWidth + itemSpacing}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
      >
        {data.map((item, index) => (
          <Box
            key={`carousel-item-${index}`}
            style={{
              width: itemWidth,
              marginRight: index < data.length - 1 ? itemSpacing : 0,
            }}
          >
            {renderItem({ item, index })}
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
};
