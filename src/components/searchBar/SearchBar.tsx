import { BiSearch } from 'react-icons/bi'
import "./searchBar.css"
import { useEffect } from 'react';
import { eventListenerSearchbar } from '../../utils/functions/eventListenerSearchbar';
import React from 'react';
import { SearchProps } from '../../types/propTypes/searchProps';

export const SearchBar: React.FC<SearchProps> = (props: SearchProps) => {

    const { focus, setFocus, searchInput, setSearchInput } = props;
    useEffect(() => {
        eventListenerSearchbar();
    }, [])
    useEffect(() => {
        // console.log(focus)
    }, [focus]);

    const handleBlur = () => {
        if (searchInput !== '') {
            setFocus(true);
        } else {
            setFocus(false);
        }
    }

    return (
        <section className="searchbar-container">
            {focus ? <></> : <h2 className="searchbar-title">Search</h2>}
            <label className={focus ? "searchbar-label-focused" : "searchbar-label"}>
                <BiSearch className={focus ? "searchbar-icon-search-focus" : "searchbar-icon-search"} />
                <input
                    id="searchbar-input"
                    type="text"
                    placeholder="What do you want to listen to?"
                    className={focus ? "searchbar-input-focus" : "searchbar-input"}
                    name="searchbar-input"
                    onFocus={() => setFocus(true)}
                    onBlur={() => handleBlur()}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}

                />
            </label>
        </section>
    )
}
