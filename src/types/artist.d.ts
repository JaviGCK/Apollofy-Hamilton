import { GenreTypes } from "./enums";
import { AlbumType } from "./album";
import { TrackType } from "./track";
import { ListType } from "./enums";
import { FavouriteType } from "../pages/libraryPage/LibraryPage";


export interface ArtistType {
    id: string,
    name?: string,
    genres?: GenreTypes[],
    tracks: TrackType[],
    imageUrl?: string,
    popularity?: number,
    albums?: AlbumType[], //if the album's length is 1 and the name of the song is the same as the albbum's, then it is a single
    listType?: ListType
}

