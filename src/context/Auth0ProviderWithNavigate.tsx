import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({ ...props }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  const { VITE_AUTH0_DOMAIN: domain, VITE_AUTH0_CLIENT_ID: clientId, VITE_AUTH0_AUDIENCE: audience } = import.meta.env
  const redirectUri: string = window.location.origin + "/home"
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {props.children}
    </Auth0Provider>
  );
};
