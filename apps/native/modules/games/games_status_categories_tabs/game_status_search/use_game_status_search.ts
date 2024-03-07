import { useNavigation } from "expo-router";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import { UserProfileScreenProps } from "../../../router/screen_props";

export const useGameStatusSearch = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation<UserProfileScreenProps["navigation"]>();
  const [debouncedSearch] = useDebounce(search, 500);
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const resetSearch = () => {
    setSearch("");
    navigation.setParams({
      take: "5",
      skip: "0",
    });
  };
  return { debouncedSearch, handleSearch, search, resetSearch };
};
