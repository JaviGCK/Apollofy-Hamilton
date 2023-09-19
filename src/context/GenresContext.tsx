import { createContext, useState } from "react";
import { GenreType } from "../types/genre";


export const genreContext = createContext<{ showGenre: GenreType[] | null, setGenres: (genres: GenreType[]) => void }>({ showGenre: null, setGenres: () => { } });

export const GenreContextProvider = ({ ...props }) => {
    const [showGenre, setshowGenre] = useState<GenreType[] | null>(null);
    const setGenres = (genres: GenreType[]) => {
        setshowGenre(genres);
    }
    return (
        <genreContext.Provider value={{ showGenre, setGenres }}>
            {props.children}
        </genreContext.Provider>
    )
}
