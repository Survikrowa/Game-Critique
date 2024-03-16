import { useNavigation } from "expo-router";
import { useEffect } from "react";

export const useSetHeaderTitle = (title: string) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, []);
};
