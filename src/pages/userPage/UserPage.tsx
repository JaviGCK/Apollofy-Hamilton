import ShareButton from "../../components/shareButton/ShareButton"
import ProfileChart from "../../components/profileChart/ProfileChart"
import ProfileMusicList from "../../components/profileMusicList/ProfileMusicList"
import './userPage.css'
import { useUserContext } from "../../hooks/useUserContext"

export const UserPage = () => {
    const { currentUser } = useUserContext();


    return (
        <section className="user-page-container">
            <ShareButton />
            <ProfileChart
                imageUrl={currentUser?.profilePicture}
                userName={currentUser?.name}
            />
            <ProfileMusicList
                tracks={currentUser?.tracks}
            />
        </section>
    )
}
