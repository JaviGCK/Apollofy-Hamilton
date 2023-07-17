import { ArtistType } from "./artist";
import { GenreTypes } from "./enums";
import { AlbumType } from "./album";


export interface TrackType {
    id: string,
    name: string,
    artists: ArtistType[],
    genre: GenreTypes[],
    liked: number,
    url: string,
    album?: AlbumType, //when is inside of an album this property is not needed
    imageUrl: string
}

/**
 * If the album name is the same as the track,
 * and the album's length is 1, then it is a single
 */
