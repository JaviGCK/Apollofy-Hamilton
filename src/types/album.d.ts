
import { ArtistType } from "./artist";
import { ListType } from "./enums";
import { GenreType } from "./genre";
import { TrackType } from "./track";


export interface AlbumType {
    id: string,
    name?: string,
    genres?: GenreType[],
    imageUrl?: string,
    popularity?: number,
    privacity?: boolean,
    veified?: boolean,
    artists?: ArtistType[], //just the id and name of the artists
    tracks?: TrackType[],
    listType?: ListType,
    usersId?: string
}
/**
 * If the album name is the same as the track,
 * and the album's length is 1, then it is a single
 */

