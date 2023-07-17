import { AlbumType } from "./album";
import { ArtistType } from "./artist";
import { PlaylistType } from "./playlist";



export type PossibleItems =
    | AlbumType
    | ArtistType
    | PlaylistType

export enum ListType {
    ALBUM = "album",
    ARTIST = "artist",
    PLAYLIST = "playlist"
}

export enum GenreTypes {
    HIPHOP = "hip-hop",
    ROCK = "rock",
    POP = "pop",
    RB = "r&b",
    METAL = "metal",
    PUNK = "punk",
    DANCE = "dance",
    RAP = "rap",
    DRILL = "drill",
    URBAN = "urban"
}


