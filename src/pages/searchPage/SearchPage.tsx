import { GenresList } from "../../components/lists/genresList/GenresList"
import { SearchBar } from "../../components/searchBar/SearchBar"
import { useState } from "react"
import SearchList from "../../components/lists/searchList/SearchList"
import "./searchPage.css"


export const SearchPage = () => {
    const [focus, setFocus] = useState(false);
    const [searchInput, setSearchInput] = useState('');


    return (
        <section className="search-page-container">
            <SearchBar focus={focus} setFocus={setFocus} searchInput={searchInput} setSearchInput={setSearchInput} />
            {focus ? <SearchList focus={focus} setFocus={setFocus} searchInput={searchInput} setSearchInput={setSearchInput} /> : <GenresList />}
        </section>
    )
}
