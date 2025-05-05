import { ReactNode } from "react";
import { Button } from "tamagui";

type ClearButtonProps = {
  onPress: () => void;
  children: ReactNode;
};

export const ClearButton = ({ onPress, children }: ClearButtonProps) => {
  return (
    <Button
      backgroundColor="transparent"
      width="min-content"
      padding={0}
      height="min-content"
      onPress={onPress}
      display="flex"
    >
      {children}
    </Button>
  );
};
