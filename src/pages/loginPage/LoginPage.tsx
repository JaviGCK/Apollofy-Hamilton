import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../../components/login/Login"
import { LogoutButton } from "../../components/logout/Logout"


export const LoginPage = () => {

    const { isAuthenticated } = useAuth0();
    console.log(isAuthenticated)

    var x = document.getElementById("myAudio") as HTMLAudioElement;

    function playAudio() {
        console.log("entro");
        x.play();
    }

    return (
        <>
            <audio id="myAudio">
                <source src="https://res.cloudinary.com/dqdysl9ep/video/upload/v1689335220/APOLLOFY/apollofy_adderall-slipknot.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
            <button onClick={playAudio} type="button">Play Audio</button>
            <LoginButton />
            <LogoutButton />
        </>
    )
}