import { GenreButton } from "../genreButton/genreButton";
import { GenreType } from "../../../types/dataTypes/genre";
import { useState } from "react";
import "./genresList.css"
import { fetchData } from "../../../api/fetchApi";



export const GenresList = ({...props}) => {
    const [genres, setGenres] = useState<GenreType[]>([]);

    const { setFocus, setCustomFilter, setSearchInput } = props;
    if (genres.length === 0) {
        const fetchGenres = async () => {
            const data: GenreType[] = await fetchData("genres") as GenreType[];
            setGenres(data);
        }
        fetchGenres();
    }

    return (
        <>
        <section className="genreslist-container">
            <p className="top-clases-genres">Your top genres</p>
            {genres.map((genre: GenreType) => {
                return (
                    <GenreButton key={genre.id} id={genre.id} name={genre.name} imageUrl={genre.imageUrl} btnColor={genre.btnColor} setFocus={setFocus} setCustomFilter={setCustomFilter} setSearchInput={setSearchInput} />
                )
            })}
            <div className="white-space"></div>
        </section>
        </>
    )
}
