
import './login.css'
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {

    const {loginWithRedirect } = useAuth0();

    const handleLogin = async () => {
      await loginWithRedirect({
        appState: {
          returnTo: "/",
        },
      });
    };

    return (
        <>
        <h1>LoginPage</h1>
        <button onClick={handleLogin}>Log In</button>;)
        </>
    )
  
};
