import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

type TanstackQueryProviderProps = {
  children: ReactNode;
};

export const TanstackQueryProvider = ({
  children,
}: TanstackQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
