import { GenreTypes } from "./genre";
export interface ArtistType {
    id: string,
    name: string,
    genres: GenreTypes[],
    popularity: number,
    imageUrl: string,
    albums: AlbumInfo[],
    tracks: TrackInfo[]
}

interface AlbumInfo {
    albumId: string,
    albumName: string
}

export interface TrackInfo {
    trackId: string,
    trackName: string,
    url: string,
    albumName: string,
    artistName: string
}


