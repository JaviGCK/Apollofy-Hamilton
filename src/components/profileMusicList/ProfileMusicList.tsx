
import './profileMusicList.css'
import { FC, useState } from 'react'
import { GroupItem } from '../lists/groupItem/GroupItem'
import { useTranslation } from 'react-i18next'
import { SearchResultType } from '../../pages/searchUserPage/SearchUserPage'
import { Toaster } from 'react-hot-toast'

interface ProfileMusicListPropTypes {
    searchResults: SearchResultType,
}

const ProfileMusicList: FC<ProfileMusicListPropTypes> = ({ searchResults }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const { t } = useTranslation();

    const handleItemClick = (index: any) => {
        setActiveIndex(index);
    };

    return (
        <div className='profile-music-container-wrapper'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='profile-music-container'>
                {searchResults && searchResults.map((result, index) => (
                    <div key={index}>
                        {result && result.length > 0 && index === 0 && <h4>{t('tracksSearch')}</h4>}
                        {result && result.length > 0 && index === 1 && <h4>{t('albumsSearch')}</h4>}
                        {result && result.length > 0 && index === 2 && <h4>{t('playlistsSearch')}</h4>}
                        <div className='music-list-container' key={index}>
                            {result?.map((item, index) => (
                                <GroupItem
                                    key={item.id}
                                    track={item}
                                    isActive={activeIndex === index}
                                    onItemClicked={() => handleItemClick(index)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
                <div className='white-space'></div>
            </div>
        </div>
    )
}
export default ProfileMusicList