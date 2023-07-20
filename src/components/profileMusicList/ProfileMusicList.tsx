import './profileMusicList.css'
import { FC, useState} from 'react'
import { GroupItem } from '../lists/groupItem/GroupItem'

import { ProfileMusicListPropTypes } from '../../types/propTypes/profileMusicListProps'



const ProfileMusicList: FC<ProfileMusicListPropTypes> = ({ tracks }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleItemClick = (index: any) => {
        setActiveIndex(index);
    };

    return (
        <div className='profile-music-container'>
            <h3>My Music</h3>
            <div className='music-list-container'>
                {tracks?.map((track, index) => (
                    <GroupItem
                    key={track.url}
                    track={track}
                    isActive={activeIndex === index}
                    onItemClicked={() => handleItemClick(index)}
                    />
                ))}
                <div className='white-space'></div>
            </div>
        </div>
    )
}
export default ProfileMusicList
