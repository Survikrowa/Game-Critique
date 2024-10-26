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

export const AuthPage = () => {
  const { loginWithRedirect } = useAuth0();
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
