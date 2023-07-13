import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../../components/login/Login"
import { LogoutButton } from "../../components/logout/Logout"


export const LoginPage = () => {

    const { isAuthenticated } = useAuth0();
    console.log(isAuthenticated)
    return(
        <>
        <LoginButton/>
        <LogoutButton/>
        </>
    )
}