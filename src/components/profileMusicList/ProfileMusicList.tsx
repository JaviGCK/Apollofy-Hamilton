import './profileMusicList.css'
import { FC } from 'react'
import { GroupItem } from '../lists/groupItem/GroupItem'

import { ProfileMusicListPropTypes } from '../../types/propTypes/profileMusicListProps'



const ProfileMusicList: FC<ProfileMusicListPropTypes> = ({ tracks }) => {


    return (
        <div className='profile-music-container'>
            <h3>My Music</h3>
            <div className='music-list-container'>
                {tracks?.map((track) => (
                    <GroupItem key={track.url} id={track.id} imageUrl={track.imageUrl} name={track.name} type="track" />
                ))}
                <div className='white-space'></div>
            </div>
        </div>
    )
}
export default ProfileMusicList
