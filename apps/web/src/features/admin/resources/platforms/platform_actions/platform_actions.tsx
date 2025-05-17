import { MoreHorizontal } from "lucide-react";

import { PlatformDisplayNameModal } from "./platform_display_name_modal/platform_display_name_modal";

import { useDisclosure } from "@/packages/ui/hooks/use_disclosure.ts";
import { Button } from "@/packages/ui/inputs/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/packages/ui/navigation/dropdown.tsx";

type PlatformActionsProps = {
  platformId: number;
  initialDisplayName?: string;
};

export const PlatformActions = ({
  platformId,
  initialDisplayName,
}: PlatformActionsProps) => {
  const { onSet, isOpen, onClose } = useDisclosure(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500">
            <Button variant="ghost" onClick={() => onSet(true)}>
              Edit Display Name
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <PlatformDisplayNameModal
        platformId={platformId}
        isOpen={isOpen}
        onOpenChange={onSet}
        onClose={onClose}
        initialDisplayName={initialDisplayName}
      />
    </>
  );
};
