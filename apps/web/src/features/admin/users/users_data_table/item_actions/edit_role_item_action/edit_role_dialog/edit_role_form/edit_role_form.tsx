import { useEditRoleForm } from "./use_editor_role_form/use_edit_role_form.ts";

import { Skeleton } from "@/packages/ui/feedback/skeleton.tsx";
import { Button } from "@/packages/ui/inputs/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/packages/ui/inputs/form.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/packages/ui/inputs/select.tsx";

type EditRoleFormProps = {
  userOauthId: string;
  onUpdateRoleSuccess: () => void;
};

export const EditRoleForm = ({
  userOauthId,
  onUpdateRoleSuccess,
}: EditRoleFormProps) => {
  const { onSubmit, form, userRoles, isUpdating } = useEditRoleForm({
    userOauthId,
    onUpdateRoleSuccess,
  });
  if (userRoles.isLoading) {
    return <Skeleton />;
  }
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex-col flex gap-4">
        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Roles" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    {userRoles.data?.roles.map((role) => (
                      <SelectItem key={role.id} value={String(role.id)}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button disabled={isUpdating} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
