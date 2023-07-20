import { useAuth0 } from "@auth0/auth0-react"
import { AddMusicForm } from "../../components/addMusicForm/AddMusicForm"
import "./addMusicPage.css"



export const AddMusicPage = () => {


    const { user } = useAuth0()


    return (
        <section>

            <div className='add-music-heading'>
                <figure className='add-music-user-img'>
                    {user === undefined ? <img src="/src/assets/img/defaultuser.webp" alt="default user image" /> : <img src={user?.picture} alt={`${user?.name}´s profile image`} />}
                </figure>
                {user === undefined ? <h2>Add your track!</h2> : <h2>{`${user?.given_name}, add your track!`}</h2>}

            </div>


            <AddMusicForm />
        </section>
    )
}
