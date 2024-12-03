import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/packages/ui/surfaces/card.tsx";
import { Button } from "@/packages/ui/inputs/button.tsx";
import { LogIn } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSetAccessToken } from "@/features/auth/use_set_access_token/use_set_access_token.ts";
import { useVerifyUserQuery } from "@/features/auth/use_verify/verify_user.generated.ts";
import { useUsersQuery } from "@/features/auth/use_users/users.generated.ts";

export const AuthPage = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  useSetAccessToken();
  const { data } = useVerifyUserQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: users } = useUsersQuery();
  console.log(users);
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
          <CardContent className="flex items-center justify-center">
            <Button onClick={() => loginWithRedirect()}>
              Sign in with Google
              <LogIn />
            </Button>
            <Button onClick={() => logout()}>wyloguj</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
