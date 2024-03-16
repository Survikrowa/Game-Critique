import { useState } from "react";
import { useDebounce } from "use-debounce";

import { useSearch } from "./search_input/use_search/use_search";

export const useSearchScreen = () => {
  const [input, setInput] = useState("");
  const [debouncedInput] = useDebounce(input, 1000);

  const { loading, data } = useSearch({
    input: debouncedInput,
  });

  const handleSearchInputChange = (value: string) => {
    setInput(value);
  };

  return {
    handleSearchInputChange,
    loading,
    data,
    input,
  };
};
