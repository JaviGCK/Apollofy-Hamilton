import { useState } from 'react';
// import ShareButton from '../../components/shareButton/ShareButton';
import ProfileChart from '../../components/profileChart/ProfileChart';
import ProfileMusicList from '../../components/profileMusicList/ProfileMusicList';
import './userPage.css';
import { useUserContext } from '../../utils/hooks/useUserContext';
import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { IoStatsChart } from "react-icons/io5";
import StatsModal from '../../components/statsModal/StatsModal';

export const UserPage: React.FC = () => {
    const { currentUser } = useUserContext();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState(currentUser?.trackList || []);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [statsModalOpen, setstatsModalOpen] = useState<boolean>(false);

    const { t } = useTranslation();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        const filteredTracks = (currentUser?.trackList || []).filter((track) =>
            track.name?.toLowerCase().includes(newSearchTerm.toLowerCase())
        );
        setSearchResults(filteredTracks);
    };

    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
    };

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
                <ProfileMusicList tracks={searchTerm ? searchResults : currentUser?.trackList} />
            </section>
            {statsModalOpen && <StatsModal setstatsModalOpen={setstatsModalOpen} />}
        </>
    );
};
