import { useNavigation } from "expo-router";
import { useEffect } from "react";

export const useResetCollectionHeaderTitle = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "",
    });
  }, []);
};
