import { ReactNode } from "react";

import { Toaster } from "@/packages/ui/feedback/toast/toaster.tsx";

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div className="min-h-screen bg-black p-8 w-full flex justify-center">
        {children}
      </div>
      <Toaster />
    </>
  );
};
