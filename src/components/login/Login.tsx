
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export const LoginButton = () => {

    useEffect(()=>{
        console.log(user)
    },[])
    const {user,  loginWithRedirect } = useAuth0();

    return (
    <>
    <h1>LoginPage</h1>
    <button onClick={() => loginWithRedirect()}>Log In</button>;)
    </>
    )
};
