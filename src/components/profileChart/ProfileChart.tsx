import { FC, useState } from 'react'
import './profileChart.css'
import { useTranslation } from 'react-i18next'
import { ListType, PossibleItems } from '../../types/enums'
import { TrackType } from '../../types/track'
import { useUserContext } from '../../utils/hooks/useUserContext'
import { FollowsList } from '../lists/followsList/FollowList'


export interface UserType {
    id: string,
    userName?: string,
    email?: string,
    imageUrl?: string,
    followers: UserType[],
    following: UserType[],
    favourites?: PossibleItems[],
    type?: ListType,
    trackList?: TrackType[],
    playLists?: string[]
}

const ProfileChart: FC = () => {

    const { currentUser } = useUserContext();
    const [modalState, setModalState] = useState<string | null>(null)

    const { t } = useTranslation();
    return (
        <div className='profile-chart-container'>
            {currentUser &&
                <div className='pcc-top'>
                    <div className='profile-img-container'><img className='pcc-profile-image' src={currentUser.imageUrl} alt="Profile-picture" /></div>
                    <div className='profile-data-container'>
                        <p>{currentUser.userName}</p>
                        <p className='profile-data-followers'>
                            <div onClick={() => setModalState("followers")}>
                                <span>{currentUser.following.length}</span><span className='pcc-width'> {t('followersProfile')} </span>
                            </div>
                            <div onClick={() => setModalState("following")}>
                                <span>{currentUser.following.length}</span><span className='pcc-width'> {t('followingProfile')} </span>
                            </div>

                        </p>
                    </div>
                    <div className={modalState === null ? "list-hidden" : "list-visible"}>
                        if ({modalState === "followers"}){
                            <FollowsList
                                list={currentUser.followers}
                            />
                        } else if ({modalState === "following"}) {
                            <FollowsList
                                list={currentUser.following}
                            />
                        } else {
                            null
                        }
                    </div>
                </div>}
        </div>
    )
}
export default ProfileChart
