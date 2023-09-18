import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import ShareButton from '../../components/shareButton/ShareButton';
import ProfileChart, { UserType } from '../../components/profileChart/ProfileChart';
import ProfileMusicList from '../../components/profileMusicList/ProfileMusicList';
import './searchUser.css';
import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../utils/hooks/useUserContext';
import { updateUserFollowing } from '../../api/fetchApi';
import { useAuth0 } from '@auth0/auth0-react';

export const SearchUser: React.FC = () => {
    const location = useLocation();
    const user: UserType = location.state.user;
    const { currentUser } = useUserContext();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState(user?.trackList || []);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const { getAccessTokenSilently } = useAuth0()

    if (currentUser === null) return;



    const { t } = useTranslation();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        const filteredTracks = (user?.trackList || []).filter((user: any) =>
            user.name?.toLowerCase().includes(newSearchTerm.toLowerCase())
        );
        setSearchResults(filteredTracks);
    };

    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
    };

    const handleFollow = async (action: string) => {
        const response = await updateUserFollowing(getAccessTokenSilently, currentUser, user.id, action);
        if (response.status === 201) setIsFollowed(!isFollowed)
    }

    useEffect(() => {
        if (currentUser?.followingIds.includes(user.id)) setIsFollowed(true);

    }, [])


    return (
        <section className="user-page-container">
            <ProfileChart
                user={user}
            />
            <button className='follow-button' onClick={isFollowed ? () => handleFollow("unfollow") : () => handleFollow("follow")}>{isFollowed ? "unfollow" : "follow"}</button>
            <div className={`search-bar-user-page ${isInputFocused ? 'search-bar-user-page-focused' : ''}`}>
                <BiSearch className="searchbar-icon-search" />
                <input
                    className='searchbar-input'
                    type="text"
                    placeholder={t('searchMySong')}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />
            </div>
            <ProfileMusicList tracks={searchTerm ? searchResults : user?.trackList} />
        </section>
    );
};
