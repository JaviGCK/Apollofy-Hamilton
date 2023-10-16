import './loginPage.css'
import BgImg from "../../assets/img/bg-image.webp"
import Logo from '../../assets/img/apollofy-logo.webp'
import { LoginButton } from "../../components/login/Login"

export const LoginPage = () => {

    return (

        <section>
            <div className='login-page-img-container'>
                <img className='login-page-img' src={BgImg} alt={`Image or Cover of Ovni`} />
                <div className='login-page-glass'>
                </div>
                <div className='login-page-title'>
                    <img className='login-page-logo' src={Logo} alt='App Logo' />
                    <h1 className='login-page-h1'>apollo<span className='login-page-span'>fy</span></h1>
                </div>
            </div>
            <LoginButton />

        </section>

    )

}