import { Image } from "react-native";

type GameImageProps = {
  uri: string | undefined;
};

export const GameImage = ({ uri }: GameImageProps) => {
  return (
    <Image
      resizeMode="contain"
      source={{ uri }}
      className="w-[200px] h-[200px] max-w-[200px] max-h-[200px]"
    />
  );
};
