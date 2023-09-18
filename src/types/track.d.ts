import { ArtistType } from "./artist";
import { GenreTypes, ListType } from "./enums";
import { AlbumType } from "./album";


export interface TrackType {
    id: string,
    name?: string,
    imageUrl: string,
    artists?: ArtistType[],
    liked?: number,
    genres?: GenreTypes[],
    audioUrl?: string,
    verified?: boolean,
    privacy: boolean,
    album?: AlbumType,
    progress?: number,
    duration?: number,
    listType: ListType
}

/**
 * If the album name is the same as the track,
 * and the album's length is 1, then it is a single
 */
