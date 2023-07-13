
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
    const {user,  loginWithRedirect } = useAuth0();
    console.log(user)
    return (
    <>
    <h1>LoginPage</h1>
    <button onClick={() => loginWithRedirect()}>Log In</button>;)
    </>
    )
};