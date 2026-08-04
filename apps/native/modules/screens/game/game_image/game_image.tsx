import { LinearGradient } from "expo-linear-gradient";
import { Image, View } from "react-native";

type GameHeroProps = {
  uri: string | undefined;
};

export const GameImage = ({ uri }: GameHeroProps) => {
  return (
    <View style={{ height: 260, width: "100%" }}>
      <Image
        source={{ uri }}
        resizeMode="cover"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.92)"]}
        locations={[0.35, 0.7, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </View>
  );
};
