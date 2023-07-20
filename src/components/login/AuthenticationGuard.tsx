import "./login.css"
import HashLoader from "react-spinners/HashLoader";
import { withAuthenticationRequired } from "@auth0/auth0-react";


export const AuthenticationGuard = (component: any) => {


  const Component = withAuthenticationRequired(component, {

    onRedirecting: () => (

      <div className="feat(">

        <HashLoader
          color={"#00ffa3"}
          loading={true}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />

      </div>

    ),

  });




  return <Component />;
};