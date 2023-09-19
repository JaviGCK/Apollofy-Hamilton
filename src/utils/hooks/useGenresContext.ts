import { useContext } from "react"
import { genreContext } from "../../context/GenresContext";


export const useGenreContext = () => useContext(genreContext);