import { Image, View } from "tamagui";

type GameImageProps = {
  uri: string | undefined;
};

export const GameImage = ({ uri }: GameImageProps) => {
  return (
    <View maxWidth={200} maxHeight={150} height="100%">
      <Image resizeMode="contain" source={{ uri, width: 200, height: 200 }} />
    </View>
  );
};
