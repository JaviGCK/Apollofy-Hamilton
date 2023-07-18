import { useAuth0} from "@auth0/auth0-react" 

export const EditProfilePage = () =>{
    const {user} = useAuth0();

    return(
        <>
        <div className="edit-user-profile-container">
            <img className="edit-user-img" src= {user?.picture}/>
            <p>{user?.picture}</p>

        </div>
        </>
    )
}