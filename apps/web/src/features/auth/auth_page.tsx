import { useAuth0 } from "@auth0/auth0-react";

import { useSetAccessToken } from "@/features/auth/use_set_access_token/use_set_access_token.ts";
import { UserAuthLoginButtonContainer } from "@/features/auth/user_auth_login_button_container/user_auth_login_button_container.tsx";
import { UserAuthenticatingLoader } from "@/features/auth/user_authenticating_loader/user_authenticating_loader.tsx";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/packages/ui/surfaces/card.tsx";

export const AuthPage = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  useSetAccessToken();
  return (
    <div className="flex items-center">
      <div className="max-w-sm w-full flex justify-center">
        <Card className="w-full max-h-min">
          <CardHeader className="flex justify-center items-center">
            <CardTitle>GameCritique</CardTitle>
            <CardDescription className="text-center">
              Welcome to the admin panel. Please sign in to continue.
            </CardDescription>
          </CardHeader>
          {isLoading && <UserAuthenticatingLoader />}
          {!isAuthenticated && !isLoading && (
            <UserAuthLoginButtonContainer
              onLoginButtonClick={loginWithRedirect}
            />
          )}
        </Card>
      </div>
    </div>
  );
};
