import { Search, Trash } from "lucide-react-native";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import {
  GAMES_STATUS_RESET_TAKE,
  useGameStatusStore,
} from "../games_status_store/use_games_status_store";

import { ButtonWithIcon } from "@/ui/forms/button_icon";
import { Input } from "@/ui/forms/input";

export const GamesStatusListSearch = () => {
  const [value, setValue] = useState("");
  const updateSearchFilter = useGameStatusStore((state) => ({
    setSearch: state.setSearch,
  }));
  const { setPagination } = useGameStatusStore((state) => ({
    setPagination: state.setPagination,
  }));
  const updateStore = useDebouncedCallback(updateSearchFilter.setSearch);
  const clearValue = () => {
    setValue("");
    updateStore("");
  };

  const handleChange = (text: string) => {
    setValue(text);
    updateStore(text);
    setPagination({
      skip: 0,
      take: GAMES_STATUS_RESET_TAKE,
    });
  };

  return (
    <Input
      onChange={handleChange}
      value={value}
      label="Wyszukiwarka twoich gier"
      icon={
        value ? (
          <ButtonWithIcon
            action="default"
            size="xs"
            onPress={clearValue}
            icon={<Trash size={16} color="#64748B" />}
          />
        ) : (
          <Search size={18} color="#64748B" />
        )
      }
    />
  );
};
