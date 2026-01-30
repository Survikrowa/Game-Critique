import { Redirect, Stack } from "expo-router";
import { useAuth0 } from "react-native-auth0";

import { SkeletonText } from "@/ui/feedback/skeleton/skeleton";
import { Box } from "@/ui/layout/box/box";

const AppAuthorizedLayout = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Box className="flex flex-1 justify-center items-center bg-black">
        <SkeletonText _lines={5} gap={4} className="h-6 w-3/4" />
      </Box>
    );
  }

  if (!user) {
    return <Redirect href="/(app)/auth" />;
  }
  return <Stack />;
};

export default AppAuthorizedLayout;
