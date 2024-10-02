import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { QueryClientProvider } from "../tanstack/client/query_client_provider";

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider>
      <UserProvider>
        <NextUIProvider className="h-full">{children}</NextUIProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};
