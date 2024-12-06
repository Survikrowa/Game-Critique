import { ReactNode } from "react";

import { Auth0Provider } from "@/features/layouts/providers/auth0_provider.tsx";
import { TanstackQueryProvider } from "@/features/layouts/providers/tanstack_query_provder.tsx";

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <Auth0Provider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </Auth0Provider>
  );
};
