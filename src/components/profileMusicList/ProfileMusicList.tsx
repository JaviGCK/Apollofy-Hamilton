
import './profileMusicList.css'
import { FC, useState } from 'react'
import { GroupItem } from '../lists/groupItem/GroupItem'
import { useTranslation } from 'react-i18next'
import { useSelectedUserContext } from '../../utils/hooks/useSearchedUserContext'
import { SearchResultType } from '../../pages/searchUserPage/SearchUserPage'

interface ProfileMusicListPropTypes {
    searchResults: SearchResultType,
}

const ProfileMusicList: FC<ProfileMusicListPropTypes> = ({ searchResults }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const { t } = useTranslation();
    const { selectedUser } = useSelectedUserContext();

    const handleItemClick = (index: any) => {
        setActiveIndex(index);
    };

    return (
        <div className='profile-music-container'>
            <h3>{t('myMusicProfile')} {selectedUser?.userName}</h3>
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
    )
}
export default ProfileMusicList