import { ReactNode } from "react";

import { Auth0Provider } from "@/features/layouts/providers/auth0_provider.tsx";
import { TanstackQueryProvider } from "@/features/layouts/providers/tanstack_query_provder.tsx";
import { ThemeProvider } from "@/features/layouts/providers/theme_provider.tsx";
import { SidebarProvider } from "@/packages/ui/navigation/sidebar.tsx";

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <Auth0Provider>
      <TanstackQueryProvider>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </TanstackQueryProvider>
    </Auth0Provider>
  );
};
