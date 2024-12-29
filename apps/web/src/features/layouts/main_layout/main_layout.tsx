import { Outlet } from "@tanstack/react-router";

import { Toaster } from "@/packages/ui/feedback/toast/toaster.tsx";

export const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-black p-8 w-full flex justify-center">
        <Outlet />
      </div>
      <Toaster />
    </>
  );
};
