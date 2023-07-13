import { AlbumType } from "./album";
import { ArtistType } from "./artist";
import { PlaylistsType } from "./playlist";
import { TrackType } from "./track";

// SACAR LA ARTISTINFO, TRACKINFO, ALBUMINFO
// PARA ACÁ ?!?!!?!??!

// AÑADIR EN ALBUM, TRACK Y PLAYLIST EL TIPO
// DE DATO QUE ES

export type PossibleItems =
    | AlbumType
    | ArtistType
    | PlaylistsType
// QUITAMOS TRACKTYPE, SI ????

enum ListType {
    ALBUM = "album",
    ARTIST = "artist",
    PLAYLIST = "playlist"
}


