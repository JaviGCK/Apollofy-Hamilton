import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import ShareButton from '../../components/shareButton/ShareButton';
import ProfileChart from '../../components/profileChart/ProfileChart';
import ProfileMusicList from '../../components/profileMusicList/ProfileMusicList';
import './searchUser.css';
import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

export const SearchUser: React.FC = () => {
    const location = useLocation();
    const user = location.state.item;
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState(user?.tracks || []);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

    const { t } = useTranslation();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        const filteredTracks = (user?.tracks || []).filter((user: any) =>
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

    return (
        <section className="user-page-container">
            <ProfileChart />
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
            <ProfileMusicList tracks={searchTerm ? searchResults : user?.tracks} />
        </section>
    );
};
