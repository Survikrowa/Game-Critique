import { ReactNode } from "react";

import { Separator } from "@/ui/layout/separator/separator";

type GamesStatusFormFullModeSectionProps = {
  isQuickMode: boolean;
  withSeparator?: boolean;
  children: ReactNode;
};

/**
 * Hides its children (+ optional trailing separator) when the form is in
 * Quick Complete mode. Keeps the "isQuickMode" branching in a single place
 * instead of repeating `{!isQuickMode && (...)}` around every full-form-only
 * field.
 */
export const GamesStatusFormFullModeSection = ({
  isQuickMode,
  withSeparator = true,
  children,
}: GamesStatusFormFullModeSectionProps) => {
  if (isQuickMode) return null;

  return (
    <>
      {children}
      {withSeparator && <Separator />}
    </>
  );
};
