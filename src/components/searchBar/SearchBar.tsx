import { BiSearch } from 'react-icons/bi'
import "./searchBar.css"
import { useEffect } from 'react';
import { eventListenerSearchbar } from '../../utils/functions/eventListenerSearchbar';



export const SearchBar = () => {
    useEffect(() => {
        eventListenerSearchbar();
    }, [])

    return (
        <section className="searchbar-container">
            <h2 className="searchbar-title">Search</h2>
            <label className="searchbar-label">
                <BiSearch className="searchbar-icon-search" />
                <input
                    id="searchbar-input"
                    type="text"
                    placeholder="What do you want to listen to?"
                    className="searchbar-input"
                    name="searchbar-input"
                />
            </label>
        </section>
    )
}



