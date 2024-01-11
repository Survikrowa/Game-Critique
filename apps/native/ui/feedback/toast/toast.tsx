import { Toast as TamaguiToast, useToastState } from "@tamagui/toast";

const variantBackground = {
  success: "$green8",
  error: "$red8",
} as const;

const variantTextColor = { success: "$green0", error: "$green0" } as const;

export const Toast = () => {
  const toastState = useToastState();
  if (!toastState) return null;
  return (
    <TamaguiToast
      key={toastState.id}
      duration={toastState.duration}
      animation="100ms"
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      backgroundColor={variantBackground[toastState.variant]}
    >
      <TamaguiToast.Title color={variantTextColor[toastState.variant]}>
        {toastState.title}
      </TamaguiToast.Title>
      <TamaguiToast.Description color={variantTextColor[toastState.variant]}>
        {toastState.description}
      </TamaguiToast.Description>
      <TamaguiToast.Close />
    </TamaguiToast>
  );
};

declare module "@tamagui/toast" {
  interface CustomData {
    description: string;
    variant: "success" | "error";
  }
}
