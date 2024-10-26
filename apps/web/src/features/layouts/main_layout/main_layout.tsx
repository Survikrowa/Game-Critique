import { ReactNode } from "react";
import { Auth0Provider } from "@/features/layouts/providers/auth0_provider.tsx";

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Auth0Provider>
      <div className="min-h-screen bg-black p-8 w-full flex justify-center">
        {children}
      </div>
    </Auth0Provider>
  );
};
