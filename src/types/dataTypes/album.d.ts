import { TrackType } from "./track";
import { ArtistInfo } from "./track";

export interface AlbumType {
    id: string,
    name: string,
    imageUrl: string,
    tracks: SimpleTrackType[],  // DEBERÍAMOS DE PASARLE EL OBBJETO ENTERO ??!!!!
    artistId: ArtistInfo[],
    // type: LISTTYPE     !!!!!
}


interface SimpleTrackType {
    trackName: string,
    url: string
}
