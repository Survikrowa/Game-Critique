import { Redirect, Slot } from "expo-router";
import { useAuth0, User } from "react-native-auth0";
import { Text } from "tamagui";

type AuthProtectedLayoutProps = {
  validate: (user: User | null) => boolean;
  redirectTo: `/${string}`;
};

export const AuthProtectedLayout = ({
  validate,
  redirectTo,
}: AuthProtectedLayoutProps) => {
  const { user, isLoading } = useAuth0();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (!validate(user)) {
    return <Redirect href={`/${redirectTo}`} />;
  }

  return <Slot />;
};
