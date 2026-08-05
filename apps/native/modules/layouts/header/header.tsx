import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HeaderContent } from "@/modules/layouts/header/header_content";

export const Header = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        className="bg-background-50"
        style={{ paddingTop: insets.top }}
        pointerEvents="none"
      />
      <HeaderContent />
    </>
  );
};
