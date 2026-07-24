import { Bell, BellRing } from "lucide-react-native";
import { ActivityIndicator } from "react-native";

type ReminderIconProps = {
  loadingAdd: boolean;
  isReminded: boolean;
};

export const ReminderIcon = ({ loadingAdd, isReminded }: ReminderIconProps) => {
  if (loadingAdd) {
    return <ActivityIndicator size={14} color="#fff" />;
  }
  if (isReminded) {
    return <BellRing size={14} color="#fff" />;
  }
  return <Bell size={14} color="#fff" />;
};
