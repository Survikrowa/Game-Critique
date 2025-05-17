import { usePlatformsQuery } from "@/features/admin/resources/platforms/use_get_all_platforms/get_all_platforms.generated.ts";

export const useGetAllPlatforms = () => {
  return usePlatformsQuery();
};
