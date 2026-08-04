import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "last_platform";

export type LastPlatform = {
  id: number;
  name: string;
};

export const useLastPlatform = () => {
  const [lastPlatform, setLastPlatformState] = useState<LastPlatform | null>(
    null,
  );

  useEffect(() => {
    SecureStore.getItemAsync(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setLastPlatformState(JSON.parse(raw));
        } catch {}
      }
    });
  }, []);

  const setLastPlatform = useCallback((platform: LastPlatform) => {
    setLastPlatformState(platform);
    SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(platform));
  }, []);

  return { lastPlatform, setLastPlatform };
};
