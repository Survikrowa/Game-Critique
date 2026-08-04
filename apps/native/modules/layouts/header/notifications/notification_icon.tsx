import { Bell } from "lucide-react-native";

import { Button, ButtonIcon } from "@/ui/forms/button/button";
export const NotificationIcon = () => {
  return (
    <Button variant="link">
      <ButtonIcon as={Bell} className="h-10 w-10" />
    </Button>
  );
};
