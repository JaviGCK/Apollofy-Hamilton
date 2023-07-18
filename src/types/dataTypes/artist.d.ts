import { GenreTypes } from "./enums";
import { AlbumType } from "./album";
import { TrackType } from "./track";
import { ListType } from "./enums";


export interface ArtistType {
    id: string,
    name?: string,
    genres?: GenreTypes[],
    popularity?: number,
    imageUrl?: string,
    albums?: AlbumType[], //if the album's length is 1 and the name of the song is the same as the albbum's, then it is a single
    type?: ListType
}

