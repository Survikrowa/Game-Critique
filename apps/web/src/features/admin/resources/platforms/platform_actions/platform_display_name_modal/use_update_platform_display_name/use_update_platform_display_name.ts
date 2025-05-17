import { useQueryClient } from "@tanstack/react-query";

import { useUpdatePlatformDisplayNameMutation } from "@/features/admin/resources/platforms/platform_actions/platform_display_name_modal/use_update_platform_display_name/update_platform_display_name.generated.ts";

export const useUpdatePlatformDisplayName = () => {
  const queryClient = useQueryClient();
  return useUpdatePlatformDisplayNameMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Platforms"] });
    },
    onError: (error) => {
      alert(`Error updating platform display name: ${error}`);
    },
  });
};
