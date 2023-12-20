import * as React from "react";
import { Text, View } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { Button } from "tamagui";

const HomeScreen = () => {
  const { authorize } = useAuth0();

  const onPress = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View>
      <Text>Witaj na home screenie</Text>
      <View style={{ flex: 1 }} />
      <Button onPress={onPress}>Log in</Button>
    </View>
  );
};

export default HomeScreen;
