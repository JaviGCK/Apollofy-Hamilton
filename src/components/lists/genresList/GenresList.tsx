import { GenreButton } from "../genreButton/genreButton";
import { GenreType } from "../../../types/genre";
import "./genresList.css"
import { useTranslation } from "react-i18next";
import { useGenreContext } from "../../../utils/hooks/useGenresContext";



export const GenresList = () => {
    const { showGenre } = useGenreContext();
    const { t } = useTranslation();



    return (
        <>
            <section className="genreslist-container">
                <p className="top-clases-genres">{t('topGenres')}</p>
                {showGenre?.map((genre: GenreType) => {
                    return (
                        <GenreButton key={genre.id} id={genre.id} name={genre.name} imageUrl={genre.imageUrl} color={genre.color} tracks={genre.tracks} />
                    )
                })}
                <div className="white-space"></div>
            </section>
        </>
    )
}
