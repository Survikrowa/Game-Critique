import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import { Header } from "../modules/layouts/header";
import tamaguiConfig from "../tamagui.config";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={tamaguiConfig}>
        <Header />
        <Slot />
      </TamaguiProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
