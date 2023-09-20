import { useEffect, useState } from 'react';
// import ShareButton from '../../components/shareButton/ShareButton';
import ProfileChart from '../../components/profileChart/ProfileChart';
import ProfileMusicList from '../../components/profileMusicList/ProfileMusicList';
import './userPage.css';
import { useUserContext } from '../../utils/hooks/useUserContext';
import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { IoStatsChart } from "react-icons/io5";
import StatsModal from '../../components/statsModal/StatsModal';
import { SearchResultType } from '../searchUserPage/SearchUserPage';
import { TrackType } from '../../types/track';
import { AlbumType } from '../../types/album';
import { PlaylistType } from '../../types/playlist';

export const UserPage: React.FC = () => {
    const { currentUser } = useUserContext();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResultType | null>(null);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [statsModalOpen, setstatsModalOpen] = useState<boolean>(false);

    const { t } = useTranslation();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        const filteredTracks = currentUser?.trackList?.filter((track: TrackType) => {
            if (track.name?.toLowerCase().includes(newSearchTerm.toLowerCase())) {
                return true
            } else return false
        }
        );
        const filteredAlbums = currentUser?.albums?.filter((album: AlbumType) => {
            if (album.name?.toLowerCase().includes(newSearchTerm.toLowerCase())) {
                return true
            } else return false
        }
        );
        const filteredPlaylists = currentUser?.playLists?.filter((playlist: PlaylistType) => {
            if (playlist.name?.toLowerCase().includes(newSearchTerm.toLowerCase())) {
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
    useEffect(() => {
        const newSearchResult: SearchResultType = [
            currentUser?.trackList,
            currentUser?.albums,
            currentUser?.playLists
        ]
        setSearchResults(newSearchResult)
    }, [])

    return (
        <>
            <section className="user-page-container">
                <ProfileChart
                    user={null}
                />
                <div className='profile-searchbar-container'>
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
                    <div>
                        <button onClick={() => setstatsModalOpen(true)} className='stat-button' value='Show stats data'>
                            <IoStatsChart />
                        </button>
                    </div>
                </div>
                {searchResults && <ProfileMusicList searchResults={searchResults} />}
            </section>
            {statsModalOpen && <StatsModal setstatsModalOpen={setstatsModalOpen} />}
        </>
    );
};
