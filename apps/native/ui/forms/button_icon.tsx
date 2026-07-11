import React, { ReactNode } from "react";
import { PressableProps, View } from "react-native";

import { Button, ButtonText } from "@/ui/forms/button/button";

type ButtonWithIconProps = {
  children?: ReactNode;
  onPress: PressableProps["onPress"];
  icon: ReactNode;
} & Omit<React.ComponentProps<typeof Button>, "onPress">;

export const ButtonWithIcon = ({
  children,
  onPress,
  icon,
  ...props
}: ButtonWithIconProps) => {
  return (
    <Button onPress={onPress} {...props}>
      <View>{icon}</View>
      {children ? <ButtonText>{children}</ButtonText> : null}
    </Button>
  );
};
