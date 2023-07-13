import { GenresList } from "../../components/lists/genresList/GenresList"
import { SearchBar } from "../../components/searchBar/SearchBar"
import "./searchPage.css"
export const SearchPage = () => {
    return (
        <section className="search-page-container">
            <SearchBar />
            <GenresList />
        </section>
    )
}
