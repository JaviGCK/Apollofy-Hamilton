import { useState } from 'react';
import ShareButton from '../../components/shareButton/ShareButton';
import ProfileChart from '../../components/profileChart/ProfileChart';
import ProfileMusicList from '../../components/profileMusicList/ProfileMusicList';
import './userPage.css';
import { useUserContext } from '../../utils/hooks/useUserContext';
import { BiSearch } from 'react-icons/bi';

export const UserPage: React.FC = () => {
    const { currentUser } = useUserContext();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState(currentUser?.tracks || []);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        const filteredTracks = (currentUser?.tracks || []).filter((track) =>
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
        <section className="user-page-container">
            {/* <ShareButton /> */}
            <ProfileChart
                imageUrl={currentUser?.profilePicture}
                userName={currentUser?.name}
            />
            <div className={`search-bar-user-page ${isInputFocused ? 'search-bar-user-page-focused' : ''}`}>
                <BiSearch className="searchbar-icon-search" />
                <input
                    className='searchbar-input'
                    type="text"
                    placeholder="Search my song"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />
            </div>
            <ProfileMusicList tracks={searchTerm ? searchResults : currentUser?.tracks} />
        </section>
    );
};
