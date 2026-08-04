import { useState } from "react";
import { useDebounce } from "use-debounce";

import { useSearch } from "./search_input/use_search/use_search";

export const useSearchScreen = () => {
  const [input, setInput] = useState("");
  const [debouncedInput] = useDebounce(input, 500);

  const { loading, data, error } = useSearch({
    input: debouncedInput,
  });

  const handleSearchInputChange = (value: string) => {
    setInput(value);
  };

  const handleClearInput = () => setInput("");

  return {
    handleSearchInputChange,
    handleClearInput,
    loading,
    data,
    error,
    input,
    debouncedInput,
    hasInput: input.trim().length > 0,
  };
};
