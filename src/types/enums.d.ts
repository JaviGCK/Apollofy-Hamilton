import { AlbumType } from "./album";
import { ArtistType } from "./artist";
import { GenreType } from "./genre";
import { PlaylistType } from "./playlist";
import { TrackType } from "./track";



export type PossibleItems =
    | AlbumType
    | ArtistType
    | PlaylistType
    | TrackType

export type ListDetailPossibleItems =
    | AlbumType
    | ArtistType
    | PlaylistType
    | GenreType

export enum ListType {
    ALBUM = "album",
    ARTIST = "artist",
    PLAYLIST = "playlist",
    USER = "user",
    GENRE = "genre",
    TRACK = "track"
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


