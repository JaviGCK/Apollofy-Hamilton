
import { ArtistType } from "./artist";
import { ListType } from "./enums";
import { TrackType } from "./track";


/**
 * ARTIS SE PUEDE PONER A VECES CUANDO EL ÁLBUM NO ESTÁ
 * ASOCIADO AL OBJETO DE ARTISTA, AHÍ SI LO NECESITA,
 * HACERLO ?
 */
export interface AlbumType {
    id: string,
    name: string,
    imageUrl: string,
    tracks: TrackType[],
    artists: ArtistType[], //just the id and name of the artists
    type?: ListType
}
// Si está compuesto por un solo track cuyo titulo es igual al deb album
// entonces se considera como single.
// no le pasamos el objeto completo de artista, ya que el álbum ya está dentro
// del artista y se genera un ciclo raro. En este caso se guardará la información más relevante del
// artista como el ud y el nombre


interface ArtistInfo {
    artistId: string,
    artistName: string
}
