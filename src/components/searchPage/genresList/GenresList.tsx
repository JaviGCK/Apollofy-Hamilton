import { GenreButton } from "../genreButton/genreButton";
import { fetchGenres } from "../../../api/fetchApi";
import { GenreType } from "../../../types/dataTypes/genre";
import { useState, useEffect } from "react";
import "./genresList.css"


export const GenresList = () => {
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchGenres();
            setGenres(data);
        }
        fetchData();
    }, [])
    return (
        <section className="genreslist-container">
        <p className="top-clases-genres">Your top genres</p>
            {genres.map((genre: GenreType) => {
                return(
                    <GenreButton key={genre.id} id={genre.id} name={genre.name} imageUrl={genre.imageUrl} btnColor={genre.btnColor}/>
                )
            })}
            <div className="white-space"></div>
        </section>
    )
}
