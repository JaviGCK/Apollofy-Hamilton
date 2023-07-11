import { ArtistInfo } from "./album";
import { GenreTypes, AlbumInfo } from "./artist";
interface TrackType {
    id: string,
    name: string,
    artists: ArtistInfo[],
    genre: GenreTypes[],
    liked: number,
    url: string,
    // It can be none or the albumId
    album: AlbumInfo[]
}

export interface ArtistInfo {
    artistId: string,
    artistName: string
}

