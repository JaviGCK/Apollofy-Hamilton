import { FC, useState } from 'react';
import './profileChart.css';
import { useTranslation } from 'react-i18next';
import { ListType } from '../../types/enums';
import { TrackType } from '../../types/track';
import { useUserContext } from '../../utils/hooks/useUserContext';
import { FollowsList } from '../lists/followsList/followList';
import { FavouriteType } from '../../pages/libraryPage/LibraryPage';
import { AlbumType } from '../../types/album';
import { PlaylistType } from '../../types/playlist';


export interface UserType {
    id: string,
    userName?: string,
    email?: string,
    imageUrl?: string,
    followers: UserType[],
    followersIds?: string[],
    following: UserType[],
    followingIds: string[],
    favourites?: FavouriteType[],
    type?: ListType,
    trackList?: TrackType[],
    playLists?: PlaylistType[],
    albums?: AlbumType[]
}

type ProfileChartProps = {
    user: UserType | null
}


const ProfileChart: FC<ProfileChartProps> = ({ user }) => {

    let selectedUser: UserType | null;
    const { currentUser } = useUserContext();
    user === null ? selectedUser = currentUser : selectedUser = user;
    const [modalState, setModalState] = useState<string | null>(null)

    const { t } = useTranslation();
    return (
        <div className='profile-chart-container'>
            {selectedUser &&
                <div className='pcc-top'>
                    <div className='profile-img-container'><img className='pcc-profile-image' src={selectedUser.imageUrl} alt="Profile-picture" /></div>
                    <div className='profile-data-container'>
                        <p>{selectedUser.userName}</p>
                        <div className='profile-data-followers'>
                            <div onClick={() => setModalState("followers")}>
                                <span>{selectedUser.followers.length}</span><span className='pcc-width'> {t('followersProfile')} </span>
                            </div>
                            <div onClick={() => setModalState("following")}>
                                <span>{selectedUser.following.length}</span><span className='pcc-width'> {t('followingProfile')} </span>
                            </div>

                        </div>
                    </div>
                    <div className={modalState === null ? "list-hidden" : "list-visible"}>
                        {modalState === "followers" &&
                            <FollowsList
                                list={selectedUser.followers}
                                handleClose={setModalState}
                            />}
                        {modalState === "following" &&
                            <FollowsList
                                list={selectedUser.following}
                                handleClose={setModalState}
                            />}

                    </div>
                </div>}
        </div>
    )
}
export default ProfileChart
