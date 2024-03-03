import { ReactNode } from "react";
import { PressableProps } from "react-native";
import { Button, ButtonIcon, ButtonProps } from "tamagui";

type ButtonIconProps = {
  children?: ReactNode;
  onPress: PressableProps["onPress"];
  icon: ReactNode;
} & ButtonProps;

export const ButtonWithIcon = ({
  children,
  onPress,
  icon,
  ...props
}: ButtonIconProps) => {
  return (
    <Button onPress={onPress} {...props} alignItems="center">
      <ButtonIcon>{icon}</ButtonIcon>
      {children}
    </Button>
  );
};
