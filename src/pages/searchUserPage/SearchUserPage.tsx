import { useEffect, useState } from 'react';
import ShareButton from '../../components/shareButton/ShareButton';
import ProfileChart, { UserType } from '../../components/profileChart/ProfileChart';
import ProfileMusicList from '../../components/profileMusicList/ProfileMusicList';
import './searchUserPage.css';
import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../utils/hooks/useUserContext';
import { fetchData, updateUserFollowing } from '../../api/fetchApi';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelectedUserContext } from '../../utils/hooks/useSearchedUserContext';
import { useNavigate } from 'react-router-dom';
import { TrackType } from '../../types/track';
import { AlbumType } from '../../types/album';
import { PlaylistType } from '../../types/playlist';
import { updateUserStats } from '../../api/statsFetchApi';

export type SearchResultType = [
    filteredTracks: TrackType[] | undefined,
    filteredAlbums: AlbumType[] | undefined,
    filteredPlaylists: PlaylistType[] | undefined
]

export const SearchUserPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { selectedUser, changeSelectedUser } = useSelectedUserContext()
    const { currentUser, setCurrentLoggedUser } = useUserContext();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResultType | null>(null);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const { getAccessTokenSilently } = useAuth0()


    useEffect(() => {
        if (selectedUser) {
            if (currentUser?.followingIds.includes(selectedUser.id)) setIsFollowed(true);
        } else {
            navigate("/search")
        }
        // Estudiar que son públicas
        const filteredTracks = selectedUser?.trackList?.filter((track: TrackType) => !track.privacity)
        const filteredAlbums = selectedUser?.albums?.filter((album: AlbumType) => !album.privacity)
        const filteredPlaylists = selectedUser?.playLists?.filter((playlist: PlaylistType) => !playlist.privacity)
        const newSearchResult: SearchResultType = [
            filteredTracks,
            filteredAlbums,
            filteredPlaylists
        ]
        setSearchResults(newSearchResult)

    }, [])


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        const filteredTracks = selectedUser?.trackList?.filter((track: TrackType) => {
            if (track.name?.toLowerCase().includes(newSearchTerm.toLowerCase()) && !track.privacity) {
                return true
            } else return false
        }
        );
        const filteredAlbums = selectedUser?.albums?.filter((album: AlbumType) => {
            if (album.name?.toLowerCase().includes(newSearchTerm.toLowerCase()) && !album.privacity) {
                return true
            } else return false
        }
        );
        const filteredPlaylists = selectedUser?.playLists?.filter((playlist: PlaylistType) => {
            if (playlist.name?.toLowerCase().includes(newSearchTerm.toLowerCase()) && !playlist.privacity) {
                return true
            } else return false
        }
        );
        const newSearchResult: SearchResultType = [
            filteredTracks,
            filteredAlbums,
            filteredPlaylists
        ]
        setSearchResults(newSearchResult);
    };

    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
    };

    const handleFollow = async (action: string) => {
        if (selectedUser && currentUser && !isFetching) {
            setIsFetching(true);
            const response = await updateUserFollowing(getAccessTokenSilently, currentUser, selectedUser.id, action);
            if (response.status === 201) {
                setIsFollowed(!isFollowed)
                const myUser = await fetchData(getAccessTokenSilently, `users/${currentUser.id}`) as UserType
                const targetUser = await fetchData(getAccessTokenSilently, `users/${selectedUser.id}`) as UserType
                updateUserStats(selectedUser.id, "followers", targetUser.followers.length)
                setCurrentLoggedUser(myUser)
                changeSelectedUser(targetUser)
            }
            setIsFetching(false);
        }
    }

    return (
        <section className="user-page-container">
            <ShareButton />
            <ProfileChart
                user={selectedUser}
            />
            <button className='follow-button' onClick={!isFetching && isFollowed ? () => handleFollow("unfollow") : () => handleFollow("follow")}>{isFollowed ? "unfollow" : "follow"}</button>
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
            {searchResults && <ProfileMusicList searchResults={searchResults} />}
        </section>
    );
};
