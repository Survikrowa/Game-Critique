import React from "react";

import { Toast, ToastDescription, ToastTitle, useToast } from "./toast";

export const useToastController = () => {
  const toast = useToast();

  const show = (
    title: string,
    options?: {
      description?: string;
      variant?: "success" | "error" | "warning" | "info" | "muted";
    },
  ) => {
    const action = options?.variant || "muted";

    toast.show({
      placement: "top",
      duration: 3000,
      render: ({ id }) => (
        <Toast nativeID={id} action={action} variant="solid">
          <ToastTitle>{title}</ToastTitle>
          {options?.description && (
            <ToastDescription>{options.description}</ToastDescription>
          )}
        </Toast>
      ),
    });
  };

  return { show };
};
