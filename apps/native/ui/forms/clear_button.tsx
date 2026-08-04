import { ReactNode } from "react";

import { Pressable } from "@/ui/forms/pressable/pressable";

type ClearButtonProps = {
  onPress: () => void;
  children: ReactNode;
};

export const ClearButton = ({ onPress, children }: ClearButtonProps) => {
  return (
    <Pressable onPress={onPress} className="self-start">
      {children}
    </Pressable>
  );
};
