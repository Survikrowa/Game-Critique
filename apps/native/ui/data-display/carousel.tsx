import { Dimensions } from "react-native";
import ReanimatedCarousel, {
  CarouselRenderItem,
} from "react-native-reanimated-carousel";

type CarouselProps<T> = {
  data: T[];
  renderItem: CarouselRenderItem<T>;
};
const width = Dimensions.get("window").width;
export const Carousel = <T,>({ data, renderItem }: CarouselProps<T>) => {
  return (
    <ReanimatedCarousel
      autoPlay
      autoPlayInterval={3000}
      width={width / 3}
      style={{
        width: "100%",
        display: "flex",
        gap: 16,
      }}
      loop
      data={data}
      renderItem={renderItem}
    />
  );
};
