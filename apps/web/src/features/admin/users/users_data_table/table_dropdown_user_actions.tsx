import { MoreHorizontal } from "lucide-react";

import { EditRoleItemAction } from "@/features/admin/users/users_data_table/item_actions/edit_role_item_action/edit_role_item_action.tsx";
import { Button } from "@/packages/ui/inputs/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/packages/ui/navigation/dropdown.tsx";

type TableDropdownUserActionsProps = {
  userOauthId: string;
};

export const TableDropdownUserActions = ({
  userOauthId,
}: TableDropdownUserActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <EditRoleItemAction userOauthId={userOauthId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
