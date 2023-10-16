import { useAuth0 } from "@auth0/auth0-react"
import { AddMusicForm } from "../../components/addMusicForm/AddMusicForm"
import "./addMusicPage.css"
import { useTranslation } from "react-i18next"

export const AddMusicPage = () => {

    const { t } = useTranslation();
    const { user } = useAuth0()

    return (
        <section>

            <div className='add-music-heading'>
                <figure className='add-music-user-img'>
                    {user === undefined ? <img src="/src/assets/img/defaultuser.webp" alt="default user image" /> : <img src={user?.picture} alt={`${user?.name}´s profile image`} />}
                </figure>
                {user === undefined ? <h2>{t('addTrack')}</h2> : <h2>{user?.given_name}, {t('addTrack')}</h2>}

            </div>

            <AddMusicForm />
        </section>
    )
}
