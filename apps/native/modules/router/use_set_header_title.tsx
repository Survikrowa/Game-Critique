import { useNavigation } from "expo-router";
import { useEffect } from "react";

import { GoBackHeader } from "../layouts/go_back_header/go_back_header";

export const useSetHeaderTitle = (title: string) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      header: () => <GoBackHeader text={title} />,
    });
  }, [title]);
};
