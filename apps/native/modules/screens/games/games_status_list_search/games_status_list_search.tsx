import { Search, Trash } from "@tamagui/lucide-icons";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { ButtonWithIcon } from "../../../../ui/forms/button_icon";
import { Input } from "../../../../ui/forms/input";
import { useGameStatusStore } from "../games_status_store/use_games_status_store";

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
      take: 9,
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
            backgroundColor="transparent"
            width={24}
            height={24}
            onPress={clearValue}
            icon={<Trash />}
          />
        ) : (
          <Search />
        )
      }
    />
  );
};
