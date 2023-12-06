import { ReactNode } from "react";
import { PressableProps } from "react-native";
import { Stack, styled } from "tamagui";

const ButtonBase = styled(Stack, {
  name: "Button",
  backgroundColor: "$chromeless",
  alignItems: "center",
  flexDirection: "row",

  hoverStyle: {
    backgroundColor: "$backgroundHover",
  },

  pressStyle: {
    backgroundColor: "rgba(11, 92, 167, 0.3)",
    opacity: 1,
  },
});

type ButtonIconProps = {
  children: ReactNode;
  onPress: PressableProps["onPress"];
};

export const ButtonIcon = ({ children, onPress }: ButtonIconProps) => {
  return <ButtonBase onPress={onPress}>{children}</ButtonBase>;
};
