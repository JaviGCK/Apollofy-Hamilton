import { GenreTypes } from "./artist";
interface TrackType {
    id: string,
    name: string,
    artistId: string,
    genre: GenreTypes[],
    liked: string,
    url: string,
    // It can be none or the albumId
    album: string
}

