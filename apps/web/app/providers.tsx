"use client";

import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <UserProvider>
      <NextUIProvider className="h-full">{children}</NextUIProvider>
    </UserProvider>
  );
};
