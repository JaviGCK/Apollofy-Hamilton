import { GenresList } from "./genresList/GenresList"
import { SearchBar } from "./searchBar/SearchBar"
import "./searchPage.css"
export const SearchPage = () => {
    return (
        <section className="search-page-container">
            <SearchBar />
            <GenresList />
        </section>
    )
}
