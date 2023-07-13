import { ListType } from "./enums";
import { TrackType } from "./track";
import { ArtistInfo } from "./track";

export interface AlbumType {
    id: string,
    name: string,
    imageUrl: string,
<<<<<<< HEAD
    tracks: SimpleTrackType[],
    artistId: ArtistInfo[],
    type: ListType
=======
    tracks: SimpleTrackType[],  // DEBERÍAMOS DE PASARLE EL OBBJETO ENTERO ??!!!!
    artistId: ArtistInfo[],
    // type: LISTTYPE     !!!!!
>>>>>>> 1998ca02a1f001249782bf983c5cfe8c724ef9da
}

// DEBERÍAMOS DE PASARLE EL OBBJETO ENTERO ??!!!!
// ASÍ COMO LA IMAGEN !!!
interface SimpleTrackType {
    trackName: string,
    url: string
}
