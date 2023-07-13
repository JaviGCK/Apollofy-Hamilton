import { AlbumType } from "./album";
import { ArtistType } from "./artist";
import { PlaylistsType } from "./playlist";
import { TrackType } from "./track";


export type PossibleItems =
    | AlbumType
    | ArtistType
    | PlaylistsType

enum ListType {
    Album = "album",
    Artist = "artist",
    Playlist = "playlist"
}


