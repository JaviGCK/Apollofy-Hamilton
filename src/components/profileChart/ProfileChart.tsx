import { FC, useState } from 'react'
import './profileChart.css'
import { useTranslation } from 'react-i18next'
import { ListType, PossibleItems } from '../../types/dataTypes/enums'
import { TrackType } from '../../types/dataTypes/track'
import { FollowsList } from '../lists/followsList/followList'

export interface UserType {
    id: string,
    userName?: string,
    email?: string,
    imageUrl?: string,
    followers: UserType[],
    following: UserType[],
    profilePicture?: string,
    libraryList?: PossibleItems[],
    type?: ListType,
    trackList?: TrackType[],
    playLists?: string[]
}


const ProfileChart: FC<UserType> = ({ userName, imageUrl, followers, following }) => {

    const [modalState, setModalState] = useState<string | null>(null)

    const { t } = useTranslation();
    return (
        <div className='profile-chart-container'>
            <div className='pcc-top'>
                <div className='profile-img-container'><img className='pcc-profile-image' src={imageUrl} alt="Profile-picture" /></div>
                <div className='profile-data-container'>
                    <p>{userName}</p>
                    <p className='profile-data-followers'>
                        <div onClick={() => setModalState("followers")}>
                            <span>{followers.length}</span><span className='pcc-width'> {t('followersProfile')} </span>
                        </div>
                        <div onClick={() => setModalState("following")}>
                            <span>{following.length}</span><span className='pcc-width'> {t('followingProfile')} </span>
                        </div>

                    </p>
                </div>
                <div className={modalState === null ? "list-hidden" : "list-visible"}>
                    if ({modalState === "followers"}){
                        <FollowsList
                            list={followers}
                        />
                    } else if ({modalState === "following"}) {
                        <FollowsList
                            list={following}
                        />
                    } else {
                        null
                    }
                </div>
            </div>
        </div>
    )
}
export default ProfileChart
