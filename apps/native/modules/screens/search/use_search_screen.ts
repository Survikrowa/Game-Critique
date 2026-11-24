import { useState } from "react";
import { useDebounce } from "use-debounce";

import { useSearch } from "./search_input/use_search/use_search";

const SEARCH_DEBOUNCE_MS = 1000;

export const useSearchScreen = () => {
  const [input, setInput] = useState("");
  const [debouncedInput] = useDebounce(input, SEARCH_DEBOUNCE_MS);

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
