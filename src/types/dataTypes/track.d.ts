import { ArtistInfo } from "./album";
import { GenreTypes, AlbumInfo } from "./artist";
interface TrackType {
    id: string,
    name: string,
    artists: ArtistInfo[],
    genre: GenreTypes[],
    liked: number,
    url: string,
    // It can be none or the albumId and name
    album: AlbumInfo[],
    imageUrl: string
}

export interface ArtistInfo {
    artistId: string,
    artistName: string
}

