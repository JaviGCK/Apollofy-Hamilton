import { GenreTypes } from "./artist";
interface TrackType {
    id: number,
    name: string,
    artistId: string,
    genre: GenreTypes[],
    liked: string,
    url: string
}