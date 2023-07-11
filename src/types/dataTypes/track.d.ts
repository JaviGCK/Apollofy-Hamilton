import { GenreTypes } from "./artist";
interface TrackType {
    id: string,
    name: string,
    artists: trackArtists[],
    genre: GenreTypes[],
    liked: number,
    url: string,
    // It can be none or the albumId
    album: string
}

interface trackArtists {
    artistId: string,
    astistName: string
}

