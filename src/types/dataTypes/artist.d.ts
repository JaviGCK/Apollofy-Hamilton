import { GenreTypes } from "./enums";
import { AlbumType } from "./album";
import { TrackType } from "./track";
import { ListType } from "./enums";


// Quito los tracks porque sino se vuelve todo muy circular.
// Si pongo el objeto entero para artistas y encima albumes tiene
// los mismos tracks de nuevo. Esto va a generar que se repitan tracks
// y que se llene la db de cosas innecesarias.
// cuando un álbum este compuesto por un solo track y el titulo del album
// sea igual al track se considera como single!!
export interface ArtistType {
    id: string,
    name: string,
    genres?: GenreTypes[],
    popularity?: number,
    imageUrl?: string,
    albums?: AlbumType[], //if the album's length is 1 and the name of the song is the same as the albbum's, then it is a single
    type?: ListType;
}

