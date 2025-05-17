import { FormProvider } from "react-hook-form";
import { z } from "zod";

import { useUpdatePlatformDisplayName } from "@/features/admin/resources/platforms/platform_actions/platform_display_name_modal/use_update_platform_display_name/use_update_platform_display_name.ts";
import { useZodForm } from "@/packages/forms/use_zod_form.ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/packages/ui/feedback/dialog.tsx";
import { Button } from "@/packages/ui/inputs/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/packages/ui/inputs/form.tsx";
import { Input } from "@/packages/ui/inputs/input.tsx";

const displayNameSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
});

type PlatformDisplayNameModalProps = {
  initialDisplayName?: string;
  onOpenChange: (open: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
  platformId: number;
};

export const PlatformDisplayNameModal = ({
  initialDisplayName,
  onOpenChange,
  isOpen,
  onClose,
  platformId,
}: PlatformDisplayNameModalProps) => {
  const updatePlatformDisplayNameMutation = useUpdatePlatformDisplayName();
  const methods = useZodForm({
    schema: displayNameSchema,
    defaultValues: {
      displayName: initialDisplayName ?? "",
    },
  });

  return (
    <>
      <Dialog modal open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Platform Display Name</DialogTitle>
          </DialogHeader>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(async (values) => {
                await updatePlatformDisplayNameMutation.mutateAsync({
                  displayName: values.displayName,
                  platformId,
                });
                onClose();
              })}
              className="flex flex-col gap-4"
            >
              <FormField
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Provide display name</FormLabel>
                      <FormControl>
                        <Input
                          autoFocus
                          placeholder="Display name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                name="displayName"
                control={methods.control}
              />
              <Button
                type="submit"
                disabled={updatePlatformDisplayNameMutation.isPending}
                variant="secondary"
              >
                Update
              </Button>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};
