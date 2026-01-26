import { ReactNode } from "react";

import { Box } from "@/ui/layout/box/box";

type BaseScreenLayoutProps = {
  children: ReactNode;
};
export const BaseScreenLayout = ({ children }: BaseScreenLayoutProps) => {
  return <Box className="relative z-[1] h-full bg-dark-800">{children}</Box>;
};
