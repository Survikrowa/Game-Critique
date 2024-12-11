import { LogIn } from "lucide-react";

import { Button } from "@/packages/ui/inputs/button.tsx";
import { CardContent } from "@/packages/ui/surfaces/card.tsx";

type UserAuthLoginButtonContainerProps = {
  onLoginButtonClick: () => void;
};

export const UserAuthLoginButtonContainer = ({
  onLoginButtonClick,
}: UserAuthLoginButtonContainerProps) => {
  return (
    <CardContent className="flex items-center justify-center flex-col gap-2">
      <Button onClick={onLoginButtonClick}>
        Sign in with Google
        <LogIn />
      </Button>
    </CardContent>
  );
};
