import './loginPage.css'
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../../components/login/Login"
import { LogoutButton } from "../../components/logout/Logout"
import Logo from '../../assets/img/apollofy-logo.webp'
import background from '../../assets/img/bg-image.png'

export const LoginPage = () => {

    const { isAuthenticated } = useAuth0();
    console.log(isAuthenticated)
    return (
        <section>
            <div className="login-page-img-container">
            <img className="login-page-img" src={background} alt="background ovni"/>

            <div className='login-page-glass'></div>
            </div>
            <div className="login-page-title">
                <img className="login-page-logo" src={Logo} alt='App Logo' />
                <h1 className="login-page-h1">apollo<span className="login-page-span">fy</span></h1>
            </div>
            <LoginButton />
            <LogoutButton />
        </section>
    )
}