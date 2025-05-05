import { ReactNode, useState } from "react";
import { Sheet as TamaguiSheet } from "tamagui";

type SheetProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  displayAsModal?: boolean;
  snapPointsMode?: "percent" | "constant" | "fit" | "mixed";
  children: ReactNode;
};

const spModes = ["percent", "constant", "fit", "mixed"] as const;

const getSnapPoints = (mode: (typeof spModes)[number]) => {
  switch (mode) {
    case "percent":
      return [85, 50, 25];
    case "constant":
      return [256, 190];
    case "fit":
      return undefined;
    case "mixed":
      return ["fit", 110];
    default:
      return ["80%", 256, 190];
  }
};

export const Sheet = ({
  onOpenChange,
  isOpen,
  displayAsModal,
  snapPointsMode = "constant",
  children,
}: SheetProps) => {
  const [position, setPosition] = useState(0);

  const snapPoints = getSnapPoints(snapPointsMode);
  return (
    <TamaguiSheet
      modal={displayAsModal}
      open={isOpen}
      onOpenChange={onOpenChange}
      position={position}
      onPositionChange={setPosition}
      animation="medium"
      zIndex={100_000}
      dismissOnSnapToBottom
      snapPoints={snapPoints}
      snapPointsMode={snapPointsMode}
    >
      <TamaguiSheet.Overlay animation="lazy" backgroundColor="$shadow8" />
      <TamaguiSheet.Handle />
      <TamaguiSheet.Frame
        borderColor="white"
        borderTopWidth={1}
        backgroundColor="black"
      >
        {children}
      </TamaguiSheet.Frame>
    </TamaguiSheet>
  );
};
