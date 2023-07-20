import './loginPage.css'
import { useAuth0 } from "@auth0/auth0-react";
import BgImg from "../../assets/img/bg-image.webp"
import Logo from '../../assets/img/apollofy-logo.webp'
import { LoginButton } from "../../components/login/Login"


export const LoginPage = () => {

    const { isAuthenticated } = useAuth0();
    console.log(isAuthenticated)

    /**
     * var x = document.getElementById("myAudio") as HTMLAudioElement;

    function playAudio() {
        console.log("entro");
        x.play();
    }
     */

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



    {/**<audio id="myAudio">
                <source src="https://res.cloudinary.com/dqdysl9ep/video/upload/v1689335220/APOLLOFY/apollofy_adderall-slipknot.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
            <button onClick={playAudio} type="button">Play Audio</button>
            
            <LogoutButton /> */}



}