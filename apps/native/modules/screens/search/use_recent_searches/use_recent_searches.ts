import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";

import { SearchGameResult } from "../search_results/search_result/search_result";

const STORAGE_KEY = "recent_searches";
const MAX_ITEMS = 4;

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<SearchGameResult[]>([]);

  useEffect(() => {
    SecureStore.getItemAsync(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setRecentSearches(JSON.parse(raw));
        } catch {}
      }
    });
  }, []);

  const addRecentSearch = useCallback((game: SearchGameResult) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((g) => g.id !== game.id);
      const updated = [game, ...filtered].slice(0, MAX_ITEMS);
      SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { recentSearches, addRecentSearch };
};
