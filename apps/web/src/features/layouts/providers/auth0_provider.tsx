import { Auth0Provider as Auth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";

type Auth0ProviderProps = {
  children: ReactNode;
};

export const Auth0Provider = ({ children }: Auth0ProviderProps) => {
  return (
    <Auth0
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
    >
      {children}
    </Auth0>
  );
};
