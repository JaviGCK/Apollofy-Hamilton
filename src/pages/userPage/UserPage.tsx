import ShareButton from "../../components/shareButton/ShareButton"
import ProfileChart from "../../components/profileChart/ProfileChart"
import ProfileMusicList from "../../components/profileMusicList/ProfileMusicList"
import './userPage.css'

export const UserPage = () => {
    return (
        <section className="user-page-container">
            <ShareButton/>
            <ProfileChart/>
            <ProfileMusicList/>
        </section>
    )
}
