import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export const useSetAccessToken = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        localStorage.setItem("token", token);
      });
    }
  }, [getAccessTokenSilently, isAuthenticated]);
};
