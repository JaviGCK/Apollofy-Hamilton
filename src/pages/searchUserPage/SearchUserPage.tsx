import { useEffect, useState } from 'react';
// import ShareButton from '../../components/shareButton/ShareButton';
import ProfileChart, { UserType } from '../../components/profileChart/ProfileChart';
import ProfileMusicList from '../../components/profileMusicList/ProfileMusicList';
import './searchUserPage.css';
import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../utils/hooks/useUserContext';
import { fetchData, updateUserFollowing } from '../../api/fetchApi';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelectedUserContext } from '../../utils/hooks/useSearchedUserContext';

export const SearchUserPage: React.FC = () => {
    const { t } = useTranslation();
    const { selectedUser, changeSelectedUser } = useSelectedUserContext()
    const { currentUser, setCurrentLoggedUser } = useUserContext();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState(selectedUser?.trackList || []);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const { getAccessTokenSilently } = useAuth0()


    useEffect(() => {
        if (selectedUser) {
            if (currentUser?.followingIds.includes(selectedUser.id)) setIsFollowed(true);
        }

    }, [])


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        const filteredTracks = (selectedUser?.trackList || []).filter((user: any) =>
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
        if (selectedUser && currentUser) {
            const response = await updateUserFollowing(getAccessTokenSilently, currentUser, selectedUser.id, action);
            if (response.status === 201) {
                setIsFollowed(!isFollowed)
                const myUser = await fetchData(getAccessTokenSilently, `users/${currentUser.id}`) as UserType
                const targetUser = await fetchData(getAccessTokenSilently, `users/${selectedUser.id}`) as UserType
                setCurrentLoggedUser(myUser)
                changeSelectedUser(targetUser)
            }
        }

    }

    return (
        <section className="user-page-container">
            <ProfileChart
                user={selectedUser}
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
            <ProfileMusicList tracks={searchTerm ? searchResults : selectedUser?.trackList} />
        </section>
    );
};
