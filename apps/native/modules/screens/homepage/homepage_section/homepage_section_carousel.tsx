import { ReactElement } from "react";

import { Carousel, CarouselRenderItemInfo } from "@/ui/data-display/carousel";
import { Box } from "@/ui/layout/box/box";

type HomepageSectionCarouselProps<T> = {
  renderItem: (info: CarouselRenderItemInfo<T>) => ReactElement;
  data: T[];
  itemWidth?: number;
  itemSpacing?: number;
};

export const HomepageSectionCarousel = <T,>({
  renderItem,
  data,
  itemWidth = 150,
  itemSpacing,
}: HomepageSectionCarouselProps<T>) => {
  return (
    <Box className="h-[236px]">
      <Carousel
        itemWidth={itemWidth}
        itemSpacing={itemSpacing}
        autoPlayInterval={10000}
        data={data}
        renderItem={renderItem}
      />
    </Box>
  );
};
