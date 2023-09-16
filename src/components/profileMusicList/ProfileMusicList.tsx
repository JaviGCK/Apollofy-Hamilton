
import './profileMusicList.css'
import { FC, useState } from 'react'
import { GroupItem } from '../lists/groupItem/GroupItem'
import { useTranslation } from 'react-i18next'
import { TrackType } from '../../types/dataTypes/track'

interface ProfileMusicListPropTypes {
    tracks: TrackType[] | undefined,
}

const ProfileMusicList: FC<ProfileMusicListPropTypes> = ({ tracks }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const { t } = useTranslation();

    const handleItemClick = (index: any) => {
        setActiveIndex(index);
    };

    return (
        <div className='profile-music-container'>
            <h3>{t('myMusicProfile')}</h3>
            <div className='music-list-container'>
                {tracks?.map((track, index) => (
                    <GroupItem
                        key={track.audioUrl}
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