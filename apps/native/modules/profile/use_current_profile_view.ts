import { useState } from "react";

export const useCurrentProfileView = () => {
  const [currentProfileViewType, setCurrentProfileViewType] = useState<
    "default" | "edit"
  >("default");
  const handleProfileViewChange = () => {
    setCurrentProfileViewType(
      currentProfileViewType === "default" ? "edit" : "default",
    );
  };

  return {
    handleProfileViewChange,
    currentProfileViewType,
  };
};
