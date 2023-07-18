import { withAuthenticationRequired } from "@auth0/auth0-react";

export const AuthenticationGuard  = ( component:any ) => {
  const Component = withAuthenticationRequired(component,{

    onRedirecting: () => (
      <div className="page-layout">
        Loading...
      </div>
    ),
  });
 
  return <Component />;
};