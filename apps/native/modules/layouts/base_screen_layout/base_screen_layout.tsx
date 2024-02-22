import { ReactNode } from "react";
import { View } from "tamagui";

type BaseScreenLayoutProps = {
  children: ReactNode;
};
export const BaseScreenLayout = ({ children }: BaseScreenLayoutProps) => {
  return (
    <View padding={16} height="100%" backgroundColor="$color.background">
      {children}
    </View>
  );
};
